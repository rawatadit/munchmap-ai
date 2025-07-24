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

# Install all dependencies including devDependencies (needed for Vite)
echo "Installing client dependencies (including devDependencies)..."
npm install --include=dev

# Verify Vite is available
echo "Checking if Vite is available..."
if npx vite --version; then
    echo "Vite found successfully"
else
    echo "Vite not found, trying to install globally..."
    npm install -g vite
fi

# Build using npx to ensure we use the local Vite installation
echo "Building with Vite..."
npx vite build
cd ..

# Debug the build output
echo "Build completed successfully!"
echo "Server directory:"
ls -la
echo "Client build directory:"
ls -la client/dist

# Output success message
echo "Render build script completed successfully!"
