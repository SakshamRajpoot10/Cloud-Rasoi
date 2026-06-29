@echo off
title Cloud Rasoi Startup Manager
echo =========================================================
echo               STARTING CLOUD RASOI
echo =========================================================
echo.

:: Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java is not installed or not in your PATH.
    echo Please install JDK 17 or higher to run the backend.
    pause
    exit /b
)

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js to run the frontend.
    pause
    exit /b
)

echo [1/3] Starting Backend Server (Spring Boot on Port 8080)...
start "Cloud Rasoi - Backend Server" cmd /c "cd backend && mvnw.cmd spring-boot:run"

echo [2/3] Starting Frontend Server (Vite/React on Port 5173)...
start "Cloud Rasoi - Frontend Dev Server" cmd /c "cd frontend && npm run dev"

echo [3/3] Waiting for servers to initialize (10 seconds)...
timeout /t 10 /nobreak >nul

echo.
echo [SUCCESS] Opening Cloud Rasoi in your default browser...
start http://localhost:5173/

echo.
echo =========================================================
echo   Cloud Rasoi is now running!
echo   -----------------------------------------------------
echo   - Frontend URL:  http://localhost:5173/
echo   - Backend URL:   http://localhost:8080/
echo   - H2 Database:   http://localhost:8080/h2-console
echo     (JDBC URL: jdbc:h2:mem:palaisdb ^| User: SA ^| Pass: [none])
echo   -----------------------------------------------------
echo   To stop the servers, close the two terminal windows 
echo   named "Cloud Rasoi - Backend Server" and "Cloud Rasoi - Frontend Dev Server".
echo =========================================================
echo.
pause
