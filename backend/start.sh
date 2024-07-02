#!/bin/bash

# Install Python dependencies
pip install -r requirement.txt

# Start Python server
python app.py &

# Start Node.js server
npm start
