<#
.SYNOPSIS
  Renders the gacha banner timeline (next ~5 weeks) as calendar.png.
  Pure System.Drawing — no external dependencies. Called by post-discord.ps1,
  but can be run standalone too.
#>
[CmdletBinding()]
param(
    [string]$DataPath = (Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'data.js'),
    [string]$OutPath  = (Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'calendar.png')
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

# ---------- load data.js ----------
$raw  = Get-Content $DataPath -Raw -Encoding UTF8
$json = ($raw -split "`n" | Where-Object { $_.TrimStart() -notlike '//*' }) -join "`n"
$json = ($json -replace 'window\.GACHA_DATA\s*=', '').Trim().TrimEnd(';').Trim()
$data = $json | ConvertFrom-Json

function ParseDay([string]$s) { [datetime]::ParseExact($s, 'yyyy-MM-dd', $null) }
function Truncate([string]$s, [int]$n) { if ($s.Length -gt $n) { $s.Substring(0, $n - 1) + [string][char]0x2026 } else { $s } }

# ---------- layout ----------
$today      = (Get-Date).Date
$rangeStart = $today.AddDays(-3)
$days       = 38
$left = 70; $right = 20; $top = 46; $rowH = 44; $bottom = 24
$W = 1100
$plotW = $W - $left - $right
$pxDay = $plotW / $days
$games = @($data.games)
$H = $top + ($rowH * $games.Count) + $bottom

function XPos([datetime]$d) { $left + (($d - $rangeStart).TotalDays * $pxDay) }

# ---------- colors / fonts ----------
$cBg    = [Drawing.Color]::FromArgb(15, 17, 23)
$cGrid  = [Drawing.Color]::FromArgb(38, 44, 58)
$cText  = [Drawing.Color]::FromArgb(232, 234, 240)
$cMuted = [Drawing.Color]::FromArgb(138, 145, 163)
$cToday = [Drawing.Color]::FromArgb(224, 92, 92)
$fTitle = New-Object Drawing.Font('Segoe UI', 11, [Drawing.FontStyle]::Bold)
$fGame  = New-Object Drawing.Font('Segoe UI', 9,  [Drawing.FontStyle]::Bold)
$fLabel = New-Object Drawing.Font('Segoe UI', 8.5)
$fSmall = New-Object Drawing.Font('Segoe UI', 8)

function AccentColor([string]$hex, [int]$alpha = 255) {
    if ($hex -match '^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$') {
        [Drawing.Color]::FromArgb($alpha, [Convert]::ToInt32($Matches[1],16), [Convert]::ToInt32($Matches[2],16), [Convert]::ToInt32($Matches[3],16))
    } else { [Drawing.Color]::FromArgb($alpha, 90, 97, 122) }
}

$bmp = New-Object Drawing.Bitmap($W, $H)
$gfx = [Drawing.Graphics]::FromImage($bmp)
$gfx.SmoothingMode     = [Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gfx.TextRenderingHint = [Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$gfx.Clear($cBg)

$bText  = New-Object Drawing.SolidBrush($cText)
$bMuted = New-Object Drawing.SolidBrush($cMuted)

# Draws a string, shifting left if it would overflow the right edge.
function DrawLabel([string]$s, [Drawing.Font]$font, [Drawing.Brush]$brush, [single]$x, [single]$y) {
    $sz = $gfx.MeasureString($s, $font)
    if ($x + $sz.Width -gt $W - 8) { $x = $W - 8 - $sz.Width }
    if ($x -lt 2) { $x = 2 }
    $gfx.DrawString($s, $font, $brush, $x, $y)
}

# ---------- header ----------
$gfx.DrawString('Gacha banner timeline', $fTitle, $bText, [single]$left, 8)
$gen = 'generated ' + $today.ToString('yyyy-MM-dd')
$genSz = $gfx.MeasureString($gen, $fSmall)
$gfx.DrawString($gen, $fSmall, $bMuted, [single]($W - $right - $genSz.Width), 12)

# ---------- weekly gridlines (Mondays) ----------
$pGrid = New-Object Drawing.Pen($cGrid)
for ($d = 0; $d -le $days; $d++) {
    $dt = $rangeStart.AddDays($d)
    if ($dt.DayOfWeek -eq 'Monday') {
        $x = [single](XPos $dt)
        $gfx.DrawLine($pGrid, $x, [single]($top - 6), $x, [single]($H - $bottom))
        $gfx.DrawString($dt.ToString('d MMM'), $fSmall, $bMuted, ($x + 2), [single]($top - 20))
    }
}

# ---------- rows ----------
for ($i = 0; $i -lt $games.Count; $i++) {
    $g = $games[$i]
    $y = $top + ($i * $rowH)

    if ($i -gt 0) { $gfx.DrawLine($pGrid, [single]$left, [single]$y, [single]($W - $right), [single]$y) }

    $bAccent = New-Object Drawing.SolidBrush((AccentColor $g.accent))
    $gfx.DrawString($g.short, $fGame, $bAccent, 8, [single]($y + ($rowH / 2) - 8))

    # current banners: solid bars + label on the top line of the row
    foreach ($b in @($g.banners)) {
        $sx = [Math]::Max((XPos (ParseDay $b.start)), $left)
        $ex = [Math]::Min((XPos ((ParseDay $b.end).AddDays(1))), $W - $right)
        if ($ex -gt $sx) {
            $gfx.FillRectangle($bAccent, [single]$sx, [single]($y + 26), [single]($ex - $sx), 12)
            DrawLabel (Truncate $b.title 48) $fLabel $bText $sx ($y + 3)
        }
    }

    # upcoming: translucent bars (est. 12-day width) + staggered small labels
    $idx = 0
    foreach ($u in @($g.upcoming)) {
        $ud = ParseDay $u.date
        if ($ud -lt $rangeStart.AddDays($days)) {
            $sx = [Math]::Max((XPos $ud), $left)
            $ex = [Math]::Min((XPos ($ud.AddDays(12))), $W - $right)
            $bSoft = New-Object Drawing.SolidBrush((AccentColor $g.accent 80))
            if ($ex -gt $sx) { $gfx.FillRectangle($bSoft, [single]$sx, [single]($y + 26), [single]($ex - $sx), 12) }
            $prefix = ''
            if ($u.approx) { $prefix = '~' }
            $slotY = $y + 14
            if ($idx % 2 -eq 1) { $slotY = $y + 3 }
            DrawLabel ($prefix + (Truncate $u.title 34)) $fSmall $bMuted $sx $slotY
            $bSoft.Dispose()
        }
        $idx++
    }
    $bAccent.Dispose()
}

# ---------- today marker ----------
$pToday = New-Object Drawing.Pen($cToday, 1.5)
$tx = [single](XPos $today)
$gfx.DrawLine($pToday, $tx, [single]($top - 6), $tx, [single]($H - $bottom))
$bToday = New-Object Drawing.SolidBrush($cToday)
$gfx.DrawString('today', $fSmall, $bToday, ($tx + 2), [single]($H - $bottom + 4))

# ---------- save ----------
$gfx.Dispose()
$bmp.Save($OutPath, [Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output $OutPath
