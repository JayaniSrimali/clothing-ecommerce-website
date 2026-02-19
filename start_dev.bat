@echo off
echo ==========================================
echo   Starting E-Commerce App (Refined)
echo ==========================================

echo [1/2] Starting Backend Server...
start "Backend Server" cmd /k "echo Starting... && cd backend && npm run dev"

echo [2/2] Starting Frontend App...
start "Frontend App" cmd /k "echo Starting... && cd frontend && npm run dev"

echo ==========================================
echo   Servers are launching!
echo   Please wait 30 seconds for them to become 'Ready'.
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:3000
echo ==========================================
echo   Keep this window open.
pause
