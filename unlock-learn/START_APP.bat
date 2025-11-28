@echo off
echo ========================================
echo   UNLOCK LEARN - Starting Application
echo ========================================
echo.

echo [1/3] Seeding database with courses...
cd server
node src/seed.js
echo.

echo [2/3] Starting backend server...
start "Backend Server" cmd /k "node src/server.js"
timeout /t 3
echo.

echo [3/3] Starting frontend...
cd ..\client
start "Frontend" cmd /k "npm run dev"
echo.

echo ========================================
echo   Application Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:8080
echo.
pause
