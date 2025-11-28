@echo off
echo Starting Backend and Frontend...
start cmd /k "cd server && npm run dev"
timeout /t 3
start cmd /k "cd client && npm run dev"
