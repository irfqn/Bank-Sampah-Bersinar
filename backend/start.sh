#!/bin/bash
# Start Python server
python backend/app.py &

# Start Node.js server
cd backend
npm start
