' 桌面日历清单 - 启动器
' 双击此文件即可启动，不会弹出命令行窗口

Dim ws, electronPath, projectPath

Set ws = CreateObject("WScript.Shell")

electronPath = "E:\Cursor\01\desktop-calendar\node_modules\electron\dist\electron.exe"
projectPath = "E:\Cursor\01\desktop-calendar"

If Not CreateObject("Scripting.FileSystemObject").FileExists(electronPath) Then
    MsgBox "找不到 Electron 程序，请确认路径正确：" & vbCrLf & electronPath, 48, "启动失败"
    WScript.Quit 1
End If

ws.CurrentDirectory = projectPath
ws.Run """" & electronPath & """ """ & projectPath & """", 1, False
