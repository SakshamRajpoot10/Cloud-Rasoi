#!/bin/bash

# Cloud Rasoi Startup Manager for macOS and Linux
echo "========================================================="
echo "              STARTING CLOUD RASOI"
echo "========================================================="
echo ""

# Check for Java
if ! type java > /dev/null 2>&1; then
    echo "[ERROR] Java is not installed. Please install JDK 17 or higher."
    exit 1
fi

# Check for Node
if ! type node > /dev/null 2>&1; then
    echo "[ERROR] Node.js is not installed. Please install Node.js."
    exit 1
fi

# Start Backend
echo "[1/3] Starting Backend Server (Spring Boot on Port 8080)..."
cd backend
chmod +x mvnw
./mvnw spring-boot:run > /dev/null 2>&1 &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "[2/3] Starting Frontend Server (Vite/React on Port 5173)..."
cd frontend
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait
echo "[3/3] Waiting for servers to initialize (10 seconds)..."
sleep 10

# Open Browser
echo ""
echo "[SUCCESS] Opening Cloud Rasoi in your default browser..."
if which xdg-open > /dev/null; then
  xdg-open http://localhost:5173/
elif which open > /dev/null; then
  open http://localhost:5173/
else
  echo "Please open http://localhost:5173/ in your browser."
fi

echo ""
echo "========================================================="
echo "  Cloud Rasoi is now running!"
echo "  -----------------------------------------------------"
echo "  - Frontend URL:  http://localhost:5173/"
echo "  - Backend URL:   http://localhost:8080/"
echo "  - H2 Database:   http://localhost:8080/h2-console"
echo "    (JDBC URL: jdbc:h2:mem:palaisdb | User: SA | Pass: [none])"
echo "  -----------------------------------------------------"
echo "  Press [Ctrl+C] to stop both servers."
echo "========================================================="
echo ""

# Handle termination
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM
wait
