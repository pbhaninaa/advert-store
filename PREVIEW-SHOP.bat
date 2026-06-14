@echo off
title Nwabisile - Preview Shop
cd /d "%~dp0"

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js is not installed.
  echo Download it free from https://nodejs.org
  pause
  exit /b 1
)

if not exist node_modules (
  echo First time setup - installing...
  call npm install
)

call npm run sync-products
if %ERRORLEVEL% NEQ 0 pause & exit /b 1

echo.
echo Opening shop preview in your browser...
echo Press Ctrl+C in this window to stop.
echo.
call npm run dev
