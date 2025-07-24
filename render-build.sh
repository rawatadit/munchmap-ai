#!/usr/bin/env bash
# This script is used by Render to build and deploy the application

# Exit on error
set -e

# Debug info
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"
echo "Directory listing:"
ls -la

# Install dependencies for the server
echo "Installing server dependencies..."
npm install

# Navigate to client directory and build the frontend
echo "Building client application..."
cd client
echo "Client directory listing:"
ls -la
npm install
npm run build
cd ..

# Debug the build output
echo "Build completed successfully!"
echo "Server directory:"
ls -la
echo "Client build directory:"
ls -la client/dist

# Output success message
echo "Render build script completed successfully!"
