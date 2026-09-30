// GitHub Actions fetches public profile metadata; the cloud task reads only the mirror.
// Profile lookup documentation: https://docs.fxembed.com/api/twitter/operations/2profilehandle/
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const ACCOUNTS = {
  GI: 'GenshinImpact', HSR: 'honkaistarrail', ZZZ: 'ZZZ_EN',
  AKE: 'AKEndfield', GFL2: 'GFL2EXILIUM_EN'
};
const HEADER_URL = /^https:\/\/pbs\.twimg\.com\/profile_banners\/(\d+)\/(\d+)(?:\/1500x500)?$/;
const USER_AGENT = 'gacha-tracker-artwork-mirror (https://github.com/ck204/gacha-tracker)';

function candidateUrl(artwork, handle, payload) {
  const current = HEADER_URL.exec(artwork.url || '');
  const source = 'https://x.com/' + handle;
  if (artwork.sourceUrl !== source || !current) throw new Error('Artwork configuration mismatch');
  const user = payload?.user;
  if (payload?.code !== 200 || user?.type !== 'profile' || user.screen_name?.toLowerCase() !== handle.toLowerCase()) {
    throw new Error('Profile lookup did not return the configured account');
  }
  if (String(user.id) !== current[1]) throw new Error('Profile account ID mismatch');
  const banner = HEADER_URL.exec(user.banner_url || '');
  if (!banner || banner[1] !== current[1]) throw new Error('Header URL missing or account ID mismatch');
  if (BigInt(banner[2]) < BigInt(current[2])) throw new Error('Lookup returned an older header version');
  return `https://pbs.twimg.com/profile_banners/${banner[1]}/${banner[2]}/1500x500`;
}

function imageDimensions(bytes) {
  if (bytes.length >= 24 && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && bytes.toString('ascii',12,16) === 'IHDR') {
    return {width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20)};
  }
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error('Unsupported or invalid header image');
  const frames = new Set([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf]);
  let offset = 2;
  while (offset + 4 <= bytes.length) {
    if (bytes[offset++] !== 0xff) throw new Error('Invalid JPEG segment');
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (offset + 2 > bytes.length) break;
    const length = bytes.readUInt16BE(offset);
    if (length < 2 || offset + length > bytes.length) break;
    if (frames.has(marker) && length >= 8) return {height: bytes.readUInt16BE(offset + 3), width: bytes.readUInt16BE(offset + 5)};
    offset += length;
  }
  throw new Error('Header image dimensions unavailable');
}

async function getBytes(url, maxBytes, request, accept) {
  const response = await request(url, {
    headers: {'User-Agent': USER_AGENT, Accept: accept}, signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (response.url && new URL(response.url).hostname !== new URL(url).hostname) throw new Error('Unexpected response host');
  if (Number(response.headers.get('content-length')) > maxBytes) throw new Error('Response exceeds size limit');
  const chunks = [];
  let total = 0;
  for await (const chunk of response.body) {
    total += chunk.length;
    if (total > maxBytes) throw new Error('Response exceeds size limit');
    chunks.push(Buffer.from(chunk));
  }
  return {bytes: Buffer.concat(chunks), contentType: (response.headers.get('content-type') || '').split(';')[0]};
}

async function buildMirror(data, previous = {}, request = fetch, clock = () => new Date()) {
  const games = {};
  for (const [short, handle] of Object.entries(ACCOUNTS)) {
    const game = data.games.find(item => item.short === short);
    if (!game?.artwork) continue;
    const providerUrl = 'https://api.fxtwitter.com/2/profile/' + handle;
    const sourceUrl = 'https://x.com/' + handle;
    const prior = previous.games?.[short];
    const record = prior?.sourceUrl === sourceUrl && prior?.providerUrl === providerUrl ? {...prior} : {};
    Object.assign(record, {sourceUrl, providerUrl, attemptedAt: clock().toISOString()});
    try {
      const profile = await getBytes(providerUrl, 1024 * 1024, request, 'application/json');
      const url = candidateUrl(game.artwork, handle, JSON.parse(profile.bytes.toString('utf8')));
      const image = await getBytes(url, 2 * 1024 * 1024, request, 'image/jpeg,image/png');
      if (!['image/jpeg','image/png'].includes(image.contentType)) throw new Error('Response is not a supported image');
      const dimensions = imageDimensions(image.bytes);
      if (dimensions.width !== 1500 || dimensions.height !== 500) throw new Error('Header must be 1500x500');
      Object.assign(record, {
        status: 'ok', accountId: HEADER_URL.exec(url)[1], url,
        verifiedAt: clock().toISOString(), imageSha256: crypto.createHash('sha256').update(image.bytes).digest('hex'),
        image: {...dimensions, contentType: image.contentType, byteLength: image.bytes.length}
      });
      delete record.error;
    } catch (error) {
      // Keep prior successful fields, but a failed latest attempt cannot count as fresh evidence.
      record.status = 'error';
      record.error = String(error.message).slice(0, 240);
    }
    games[short] = record;
  }
  return {version: 1, provider: 'FxEmbed public profile API', generatedAt: clock().toISOString(), games};
}

async function main() {
  const root = path.resolve(__dirname, '..');
  const source = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
  const data = JSON.parse(source.split('window.GACHA_DATA =')[1].trim().replace(/;$/, ''));
  const output = path.join(root, 'mirrors', 'artwork-headers.json');
  const previous = fs.existsSync(output) ? JSON.parse(fs.readFileSync(output, 'utf8')) : {};
  const mirror = await buildMirror(data, previous);
  fs.mkdirSync(path.dirname(output), {recursive: true});
  fs.writeFileSync(output, JSON.stringify(mirror, null, 2) + '\n');
  for (const [short, record] of Object.entries(mirror.games)) console.log(`${short}: ${record.status}${record.error ? ' — ' + record.error : ''}`);
}

module.exports = {candidateUrl, imageDimensions, buildMirror};
if (require.main === module) main().catch(error => {console.error(error.message); process.exitCode = 1;});
