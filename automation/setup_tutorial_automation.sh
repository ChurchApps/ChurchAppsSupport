#!/bin/bash

# Setup Script for ChurchApps Tutorial Automation System
# This script installs the necessary dependencies for browser automation

echo "==============================================="
echo "ChurchApps Tutorial Automation Setup"
echo "==============================================="

# Check if running with sudo
if [ "$EUID" -ne 0 ]; then
    echo "Please run this script with sudo:"
    echo "sudo ./setup_tutorial_automation.sh"
    exit 1
fi

echo "Installing system dependencies for Playwright..."

# Update package list
apt-get update

# Install required system packages for Playwright
apt-get install -y \
    libnspr4 \
    libnss3 \
    libasound2t64 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libxss1 \
    libasound2 \
    libatspi2.0-0 \
    libgtk-3-0

echo "System dependencies installed successfully!"

# Switch back to regular user for npm operations
SUDO_USER_HOME=$(eval echo ~$SUDO_USER)
cd "$SUDO_USER_HOME/ChurchAppsSupport" || exit 1

echo "Installing Playwright browsers..."
sudo -u $SUDO_USER npx playwright install

echo "Setup completed successfully!"
echo ""
echo "You can now run the tutorial automation with:"
echo "  node tutorial_updater.js"
echo ""
echo "Or test the proof of concept with:"
echo "  node test_tutorial_concept.js"
echo ""
echo "Next steps:"
echo "1. Test with a single tutorial: chums/adding-people"
echo "2. Verify screenshots and script accuracy"
echo "3. Scale to other tutorials once validated"