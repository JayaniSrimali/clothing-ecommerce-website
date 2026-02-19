@echo off
echo ==========================================
echo   Starting E-Commerce App (Full Stack)
echo ==========================================

echo [1/2] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm install && npm run dev"

echo [2/2] Starting Frontend Application...
start "Frontend App" cmd /k "cd frontend && npm install && npm run dev"

echo ==========================================
echo   Servers are launching is separate windows!
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:3000
echo ==========================================
pause
