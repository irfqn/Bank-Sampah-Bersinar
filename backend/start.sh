#!/bin/bash
# Start Python server
python app.py &

# Start Node.js server
cd backend
npm start
