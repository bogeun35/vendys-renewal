@echo off
setlocal
cd /d "%~dp0"
if not exist "%~dp0dist\index.html" (
  echo Cannot find dist\index.html. Keep the dist folder beside START.bat.
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
start "" "%CHROME_EXE%" "%~dp0dist\index.html"
exit /b 0
