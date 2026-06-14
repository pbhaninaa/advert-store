@echo off
title Nwabisile - Update Website
cd /d "%~dp0"

echo.
echo  ========================================
echo   Nwabisile Shop - Publish to Website
echo  ========================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js is not installed.
  echo Download it free from https://nodejs.org
  echo.
  pause
  exit /b 1
)

where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Git is not installed.
  echo Download from https://git-scm.com
  echo.
  pause
  exit /b 1
)

echo Step 1: Checking your products folder...
call npm run sync-products
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Fix the errors above, then try again.
  echo Open my-products\START-HERE.txt or ADD-PRODUCTS.md for help.
  echo.
  pause
  exit /b 1
)

echo Step 2: Uploading to GitHub...
git add my-products public/my-products
git diff --cached --quiet
if %ERRORLEVEL% EQU 0 (
  echo.
  echo Nothing new to publish. Your website is already up to date.
  echo.
  pause
  exit /b 0
)

git commit -m "Update shop products"
if %ERRORLEVEL% NEQ 0 (
  echo Commit failed.
  pause
  exit /b 1
)

git push
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Push failed. Check your internet connection and GitHub login.
  echo.
  pause
  exit /b 1
)

echo.
echo  Done! Your website will update in 1-2 minutes:
echo  https://pbhaninaa.github.io/advert-store/
echo.
echo  Hard refresh your phone browser if you do not see changes.
echo.
pause
