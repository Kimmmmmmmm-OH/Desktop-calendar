@echo off
chcp 65001 >nul
cd /d "E:\Cursor\01\desktop-calendar"
echo 正在启动桌面日历清单...
start "" "E:\Cursor\01\desktop-calendar\node_modules\electron\dist\electron.exe" "E:\Cursor\01\desktop-calendar"
