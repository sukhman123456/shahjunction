@echo off
chcp 65001 >nul
echo ================================================================
echo   Uploading Shah Junction to GitHub (sukhman123456/shahjunction)
echo ================================================================
echo.

git add -A
git commit -m "Upload complete project source code, public assets, and components"
git push origin main

echo.
echo ================================================================
echo   Complete! All files have been uploaded to GitHub.
echo ================================================================
pause
