<#
.SYNOPSIS
  Pushes the gacha banner dashboard to Discord as a single, edited-in-place
  webhook message (live dashboard mode), plus separate "ending soon" alerts.

.DESCRIPTION
  - Reads data.js (strict JSON after the '=' — see README.md).
  - Renders calendar.png via make-calendar.ps1 and attaches it as a timeline
    embed at the bottom of the message.
  - First run: POSTs the dashboard message, saves its messageId into
    discord.config.json, and asks you to pin it.
  - Later runs: PATCHes the same message in place. Countdowns use Discord
    dynamic timestamps (<t:..:R>) so they tick down without edits.
  - Banners ending within alertHoursBefore trigger ONE alert message each
    (tracked in alertedKeys so daily runs don't re-ping).

.NOTES
  Config: discord.config.json next to this script.
  Run manually or via Task Scheduler (daily). Safe to re-run any time.
#>
[CmdletBinding()]
param(
    # Print the payload instead of calling Discord (no webhook needed).
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Add-Type -AssemblyName System.Net.Http

$root       = Split-Path -Parent $MyInvocation.MyCommand.Path
$dataPath   = Join-Path $root 'data.js'
$configPath = Join-Path $root 'discord.config.json'

# ---------- load data.js (strip JS wrapper, parse strict JSON) ----------
if (-not (Test-Path $dataPath)) { throw "data.js not found at $dataPath" }
$raw  = Get-Content $dataPath -Raw -Encoding UTF8
$json = ($raw -split "`n" | Where-Object { $_.TrimStart() -notlike '//*' }) -join "`n"
$json = $json -replace 'window\.GACHA_DATA\s*=', ''
$json = $json.Trim().TrimEnd(';').Trim()
$data = $json | ConvertFrom-Json

# ---------- load config ----------
if (-not (Test-Path $configPath)) { throw "discord.config.json not found. Copy the template from README.md and paste your webhook URL." }
$config = Get-Content $configPath -Raw -Encoding UTF8 | ConvertFrom-Json
if (-not $DryRun) {
    if (-not $config.webhookUrl -or $config.webhookUrl -notmatch '^https://(discord\.com|discordapp\.com)/api/webhooks/') {
        throw "webhookUrl in discord.config.json is empty or not a Discord webhook URL."
    }
}

function Save-Config {
    $config | ConvertTo-Json -Depth 5 | Out-File $configPath -Encoding utf8
}

# ---------- helpers ----------
function Get-Unix([string]$dateStr) {
    $dt = [datetime]::ParseExact($dateStr, 'yyyy-MM-dd', $null)  # local midnight
    [DateTimeOffset]::new($dt).ToUnixTimeSeconds()
}
function Get-EndUnix([string]$dateStr) {
    # banner runs through the end of its listed end day
    $dt = [datetime]::ParseExact($dateStr, 'yyyy-MM-dd', $null).AddDays(1)
    [DateTimeOffset]::new($dt).ToUnixTimeSeconds()
}
function Get-AccentInt([string]$hex) {
    if ($hex -match '^#?([0-9a-fA-F]{6})$') { [Convert]::ToInt32($Matches[1], 16) } else { 5793266 }
}

# Sends JSON (or JSON + PNG as multipart) to a webhook endpoint.
# Returns @{ Status = <int>; Body = <string> } without throwing on HTTP errors.
function Invoke-Webhook([string]$Method, [string]$Uri, [string]$JsonPayload, [string]$FilePath) {
    $client = New-Object System.Net.Http.HttpClient
    try {
        if ($FilePath) {
            $content = New-Object System.Net.Http.MultipartFormDataContent
            $jsonPart = New-Object System.Net.Http.StringContent($JsonPayload, [Text.Encoding]::UTF8, 'application/json')
            $content.Add($jsonPart, 'payload_json')
            $bytes = [IO.File]::ReadAllBytes($FilePath)
            $filePart = New-Object System.Net.Http.ByteArrayContent -ArgumentList @(,$bytes)
            $filePart.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::Parse('image/png')
            $content.Add($filePart, 'files[0]', [IO.Path]::GetFileName($FilePath))
        } else {
            $content = New-Object System.Net.Http.StringContent($JsonPayload, [Text.Encoding]::UTF8, 'application/json')
        }
        $request = New-Object System.Net.Http.HttpRequestMessage((New-Object System.Net.Http.HttpMethod($Method)), $Uri)
        $request.Content = $content
        $response = $client.SendAsync($request).Result
        $body = $response.Content.ReadAsStringAsync().Result
        return @{ Status = [int]$response.StatusCode; Body = $body }
    } finally {
        $client.Dispose()
    }
}

# ---------- render the timeline calendar ----------
$calendarPath = Join-Path $root 'calendar.png'
& (Join-Path $root 'make-calendar.ps1') -DataPath $dataPath -OutPath $calendarPath | Out-Null
if (-not (Test-Path $calendarPath)) { throw "make-calendar.ps1 did not produce $calendarPath" }

# ---------- build embeds (one per game + timeline image) ----------
$nowUnix = [DateTimeOffset]::Now.ToUnixTimeSeconds()
$embeds  = @()
$endingSoon = @()   # banners inside the alert window

foreach ($g in $data.games) {
    $lines = @()

    foreach ($b in $g.banners) {
        $endUnix = Get-EndUnix $b.end
        $lines += "**$($b.title)**"
        if ($endUnix -lt $nowUnix) {
            $lines += "<t:$(Get-Unix $b.start):d> -> <t:$(Get-Unix $b.end):d> - **ENDED** (data needs refresh)"
        } else {
            $lines += "<t:$(Get-Unix $b.start):d> -> <t:$(Get-Unix $b.end):d> - ends <t:${endUnix}:R>"
            $hoursLeft = ($endUnix - $nowUnix) / 3600
            if ($hoursLeft -le $config.alertHoursBefore) {
                $endingSoon += [pscustomobject]@{ Key = "$($g.short)|$($b.title)|$($b.end)"; Game = $g.name; Title = $b.title; EndUnix = $endUnix }
            }
        }
    }
    if ($g.needsCheck) { $lines += "No tracked banner data - check the links below." }

    if ($g.upcoming -and $g.upcoming.Count -gt 0) {
        $lines += ""
        $lines += "**Upcoming**"
        foreach ($u in $g.upcoming) {
            $approx = if ($u.approx) { '~' } else { '' }
            $lines += "- $($u.title) - $approx<t:$(Get-Unix $u.date):D> (<t:$(Get-Unix $u.date):R>)"
        }
    }
    if ($g.notes) { $lines += ""; $lines += "_$($g.notes)_" }
    if ($g.links -and $g.links.Count -gt 0) {
        $lines += ($g.links | ForEach-Object { "[$($_.label)]($($_.url))" }) -join ' | '
    }

    $embeds += [ordered]@{
        title       = "$($g.name)  -  $($g.version)"
        description = ($lines -join "`n")
        color       = Get-AccentInt $g.accent
    }
}

# timeline calendar embed (image attached as files[0])
$embeds += [ordered]@{
    title = ':calendar_spiral: Timeline - next 5 weeks'
    color = 5793266
    image = @{ url = 'attachment://calendar.png' }
}

$payload = [ordered]@{
    content     = ":slot_machine: **Gacha Banner Tracker**  -  data refreshed $($data.lastUpdated)  -  <https://ck204.github.io/gacha-tracker/>"
    embeds      = $embeds
    attachments = @(@{ id = 0; filename = 'calendar.png' })
}
$payloadJson = $payload | ConvertTo-Json -Depth 10

if ($DryRun) {
    Write-Host "--- DRY RUN: payload that would be sent (plus calendar.png attachment) ---"
    $payloadJson
    Write-Host "--- ending-soon banners in alert window: $($endingSoon.Count) ---"
    $endingSoon | ForEach-Object { Write-Host " * $($_.Game): $($_.Title)" }
    return
}

# ---------- post or edit the dashboard message ----------
$baseUrl = $config.webhookUrl.Split('?')[0]

function Post-NewDashboard {
    $result = Invoke-Webhook 'POST' "$baseUrl`?wait=true" $payloadJson $calendarPath
    if ($result.Status -lt 200 -or $result.Status -ge 300) { throw "Discord POST failed ($($result.Status)): $($result.Body)" }
    $msg = $result.Body | ConvertFrom-Json
    $config.messageId = $msg.id
    Save-Config
    Write-Host "Posted new dashboard message (id $($msg.id)). PIN IT in Discord so it stays visible."
}

if ([string]::IsNullOrEmpty($config.messageId)) {
    Post-NewDashboard
} else {
    $result = Invoke-Webhook 'PATCH' "$baseUrl/messages/$($config.messageId)" $payloadJson $calendarPath
    if ($result.Status -eq 404) {
        Write-Warning "Saved message no longer exists (deleted?). Posting a fresh one."
        Post-NewDashboard
    } elseif ($result.Status -lt 200 -or $result.Status -ge 300) {
        throw "Discord PATCH failed ($($result.Status)): $($result.Body)"
    } else {
        Write-Host "Dashboard message updated in place (timeline image refreshed)."
    }
}

# ---------- ending-soon alerts (one ping per banner, ever) ----------
$alerted = @()
if ($config.alertedKeys) { $alerted = @($config.alertedKeys) }
$newAlerts = @($endingSoon | Where-Object { $alerted -notcontains $_.Key })

foreach ($a in $newAlerts) {
    $mention = if ($config.alertMention) { "$($config.alertMention) " } else { '' }
    $alertJson = @{ content = "${mention}:warning: **$($a.Game)** - *$($a.Title)* ends <t:$($a.EndUnix):R>!" } | ConvertTo-Json
    $result = Invoke-Webhook 'POST' $baseUrl $alertJson $null
    if ($result.Status -lt 200 -or $result.Status -ge 300) { throw "Discord alert POST failed ($($result.Status)): $($result.Body)" }
    $alerted += $a.Key
    Write-Host "Alert sent: $($a.Game) - $($a.Title)"
}

# prune keys for banners no longer in data.js, then save
$allDataKeys = @()
foreach ($g in $data.games) { foreach ($b in $g.banners) { $allDataKeys += "$($g.short)|$($b.title)|$($b.end)" } }
$config.alertedKeys = @($alerted | Where-Object { $allDataKeys -contains $_ })
Save-Config
Write-Host "Done."
