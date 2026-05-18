$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$electronExe = Join-Path $projectDir "node_modules\electron\dist\electron.exe"
$desktopDir = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktopDir "desktop-calendar.lnk"

if (-not (Test-Path $electronExe)) {
    Write-Host "ERROR: Electron not found at $electronExe"
    exit 1
}

$ws = New-Object -ComObject WScript.Shell
$sc = $ws.CreateShortcut($shortcutPath)
$sc.TargetPath = $electronExe
$sc.Arguments = $projectDir
$sc.WorkingDirectory = $projectDir
$sc.Description = "Desktop Calendar"
$sc.Save()

Write-Host "Shortcut created: $shortcutPath"
