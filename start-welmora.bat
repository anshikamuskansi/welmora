@echo off
cd /d "%~dp0backend"

start "Welmora Backend" cmd /k "npm start"

timeout /t 3 /nobreak >nul

start "" "http://127.0.0.1:5500/index.html"