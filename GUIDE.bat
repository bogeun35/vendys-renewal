@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
if not exist "%~dp0제출자료\index.html" (
  echo Cannot find 제출자료\index.html. Keep the submission folder beside GUIDE.bat.
  pause
  exit /b 1
)
set "CHROME_EXE="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined CHROME_EXE if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined CHROME_EXE if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=%LocalAppData%\Google\Chrome\Application\chrome.exe"
if not defined CHROME_EXE (
  echo Google Chrome was not found. Please install Chrome and try again.
  pause
  exit /b 1
)
start "" "%CHROME_EXE%" "%~dp0제출자료\index.html"
exit /b 0
