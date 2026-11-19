const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {candidateUrl, imageDimensions, buildMirror} = require('./mirror-artwork.cjs');
const text = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8');
const data = JSON.parse(text.split('window.GACHA_DATA =')[1].trim().replace(/;$/, ''));
const gi = data.games.find(game => game.short === 'GI').artwork;
const [, , , , accountId, headerVersion] = gi.url.split('/');
const headerBase = 'https://pbs.twimg.com/profile_banners/' + accountId;
const profileUrl = 'https://api.fxtwitter.com/2/profile/GenshinImpact';
const idProfileUrl = 'https://api.fxtwitter.com/2/profile/id:' + accountId;
const profile = {
  code: 200, user: {type: 'profile', id: accountId, screen_name: 'GenshinImpact',
    banner_url: headerBase + '/' + headerVersion}
};
assert.equal(candidateUrl(gi, 'GenshinImpact', profile), gi.url);
const nextHeader = headerBase + '/' + (BigInt(headerVersion) + 1n);
const changed = {code: 200, user: {...profile.user, banner_url: nextHeader}};
assert.equal(candidateUrl(gi, 'GenshinImpact', changed), nextHeader + '/1500x500');
for (const userPatch of [
  {id: '123'}, {screen_name: 'FakeAccount'}, {banner_url: 'https://evil.example/image'},
  {banner_url: 'https://pbs.twimg.com/profile_banners/123/1790131350'},
  {banner_url: gi.url + '?redirect=elsewhere'}, {banner_url: null}
]) assert.throws(() => candidateUrl(gi, 'GenshinImpact', {code: 200, user: {...profile.user, ...userPatch}}));
assert.throws(() => candidateUrl(gi, 'GenshinImpact', {code: 200, user: {...profile.user,
  banner_url: headerBase + '/' + (BigInt(headerVersion) - 1n)}}));
assert.throws(() => candidateUrl(gi, 'GenshinImpact', {code: 404}));
const png = Buffer.alloc(24);
Buffer.from([137,80,78,71,13,10,26,10]).copy(png);
png.write('IHDR', 12); png.writeUInt32BE(1500,16); png.writeUInt32BE(500,20);
assert.deepEqual(imageDimensions(png), {width: 1500, height: 500});
const jpeg = Buffer.from([0xff,0xd8,0xff,0xc0,0,8,8,1,244,5,220,1]);
assert.deepEqual(imageDimensions(jpeg), {width: 1500, height: 500});
assert.throws(() => imageDimensions(Buffer.from('<html>not an image</html>')));
assert.throws(() => imageDimensions(Buffer.from([0xff,0xd8,0xff,0xc0,0,8])));
const requests = [];
function response(bytes, type, status = 200) {
  return new Response(bytes, {status, headers: {'content-type': type}});
}
async function request(url) {
  requests.push(url);
  if (url.startsWith('https://api.fxtwitter.com/2/profile/')) {
    const handle = url.split('/').pop();
    const art = data.games.find(game => game.artwork?.sourceUrl === 'https://x.com/' + handle).artwork;
    const id = art.url.split('/')[4];
    return response(JSON.stringify({code: 200, user: {type: 'profile', id, screen_name: handle, banner_url: art.url.replace('/1500x500','')}}), 'application/json');
  }
  assert.match(url, /^https:\/\/pbs\.twimg\.com\/profile_banners\/\d+\/\d+\/1500x500$/);
  return response(png, 'image/png');
}
(async () => {
  const first = await buildMirror(data, {}, request, () => new Date('2026-09-30T13:07:00Z'));
  assert.deepEqual(Object.keys(first.games), ['GI','HSR','ZZZ','AKE','GFL2']);
  assert.equal(requests.length,10);
  assert.ok(!requests.some(url => /FGO|fate/i.test(url)));
  for (const [short, record] of Object.entries(first.games)) {
    assert.equal(record.status,'ok'); assert.equal(record.url,data.games.find(game=>game.short===short).artwork.url);
    assert.equal(record.verifiedAt,'2026-09-30T13:07:00.000Z');
    assert.match(record.imageSha256,/^[a-f0-9]{64}$/);
  }
  const later = () => new Date('2026-10-01T13:07:00Z');
  const noWait = async () => {};
  const failed = await buildMirror(data, first, async () => {throw new Error('Unavailable');}, later, noWait);
  for (const [short, record] of Object.entries(failed.games)) {
    assert.equal(record.status,'error'); assert.equal(record.url,first.games[short].url);
    assert.equal(record.verifiedAt,first.games[short].verifiedAt);
    assert.notEqual(record.attemptedAt,record.verifiedAt);
  }
  const giOnly = {games: [data.games.find(game => game.short === 'GI')]};
  const retryCalls = [];
  const delays = [];
  const recordWait = async milliseconds => {delays.push(milliseconds);};
  let profileAttempts = 0;
  const profileRetried = await buildMirror(giOnly, first, async url => {
    retryCalls.push(url);
    if (url === profileUrl && ++profileAttempts === 1) return response('unavailable', 'text/plain', 503);
    return request(url);
  }, later, recordWait);
  assert.deepEqual(retryCalls.splice(0), [profileUrl, profileUrl, gi.url]);
  assert.deepEqual(delays.splice(0), [3000]);
  assert.equal(profileRetried.games.GI.status, 'ok');
  assert.equal(profileRetried.games.GI.verifiedAt, later().toISOString());

  const idRecovered = await buildMirror(giOnly, first, async url => {
    retryCalls.push(url);
    if (url === profileUrl) return response('not found', 'text/plain', 404);
    if (url === idProfileUrl) return response(JSON.stringify(profile), 'application/json');
    return request(url);
  }, later, recordWait);
  assert.deepEqual(retryCalls.splice(0), [profileUrl, idProfileUrl, gi.url]);
  assert.deepEqual(delays.splice(0), [3000]);
  assert.equal(idRecovered.games.GI.status, 'ok');
  assert.equal(idRecovered.games.GI.providerUrl, profileUrl);

  profileAttempts = 0;
  const imageRecovered = await buildMirror(giOnly, first, async url => {
    retryCalls.push(url);
    if (url === gi.url) return response('not found', 'text/plain', 404);
    if (url === profileUrl && ++profileAttempts === 2) return response(JSON.stringify(changed), 'application/json');
    return request(url);
  }, later, recordWait);
  assert.deepEqual(retryCalls.splice(0), [profileUrl, gi.url, profileUrl, nextHeader + '/1500x500']);
  assert.deepEqual(delays.splice(0), [3000]);
  assert.equal(imageRecovered.games.GI.status, 'ok');
  assert.equal(imageRecovered.games.GI.url, nextHeader + '/1500x500');

  let imageAttempts = 0;
  const limited = await buildMirror(giOnly, first, async url => {
    retryCalls.push(url);
    if (url === gi.url && ++imageAttempts === 1) return response('rate limited', 'text/plain', 429);
    return request(url);
  }, later, recordWait);
  assert.deepEqual(retryCalls.splice(0), [profileUrl, gi.url, gi.url]);
  assert.deepEqual(delays.splice(0), [3000]);
  assert.equal(limited.games.GI.status, 'ok');

  const imageMissing = await buildMirror(giOnly, first, async url => {
    retryCalls.push(url);
    return url === gi.url ? response('not found', 'text/plain', 404) : request(url);
  }, later, recordWait);
  assert.deepEqual(retryCalls.splice(0), [profileUrl, gi.url, profileUrl, gi.url]);
  assert.deepEqual(delays.splice(0), [3000]);
  assert.equal(imageMissing.games.GI.status, 'error');
  assert.equal(imageMissing.games.GI.error, 'X CDN image download ' + gi.url + ': HTTP 404');
  assert.equal(imageMissing.games.GI.url, first.games.GI.url);
  assert.equal(imageMissing.games.GI.verifiedAt, first.games.GI.verifiedAt);
  assert.equal(imageMissing.games.GI.imageSha256, first.games.GI.imageSha256);

  const profileMissing = await buildMirror(giOnly, first, async url => {
    retryCalls.push(url);
    return response('not found', 'text/plain', 404);
  }, later, recordWait);
  assert.deepEqual(retryCalls, [profileUrl, idProfileUrl]);
  assert.deepEqual(delays, [3000]);
  assert.equal(profileMissing.games.GI.status, 'error');
  assert.equal(profileMissing.games.GI.error, 'FxEmbed profile lookup ' + idProfileUrl + ': HTTP 404');
  assert.equal(profileMissing.games.GI.verifiedAt, first.games.GI.verifiedAt);

  const wrongType = await buildMirror(giOnly, {}, async url => url.includes('api.fxtwitter.com') ? request(url) : response('<html/>','text/html'));
  assert.equal(wrongType.games.GI.status,'error'); assert.equal(wrongType.games.GI.url,undefined);
  const small = Buffer.from(png); small.writeUInt32BE(600,16);
  const wrongSize = await buildMirror(giOnly, {}, async url => url.includes('api.fxtwitter.com') ? request(url) : response(small,'image/png'));
  assert.equal(wrongSize.games.GI.status,'error');
  const excessive = await buildMirror(giOnly, {}, async () => new Response('{}',{headers:{'content-length':'9000000'}}));
  assert.equal(excessive.games.GI.status,'error');
  assert.deepEqual((await buildMirror({games: []})).games,{});
  console.log('PASS: account identity, image validation, bounded retries, failure diagnostics, prior artwork retention, and FGO exclusion.');
})().catch(error => {console.error(error); process.exitCode = 1;});
