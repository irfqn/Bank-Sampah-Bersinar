#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Start Python server
python app.py &

# Start Node.js server
npm start
