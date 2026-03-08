#!/bin/bash

# ─────────────────────────────────────────────────────
#  Durrant Guitars — Save & Deploy
#  Run this after making changes in the Keystatic admin
# ─────────────────────────────────────────────────────

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Durrant Guitars — Save & Deploy     ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
echo ""

# Step 1: Check for changes
if git diff --quiet && git diff --cached --quiet; then
    echo -e "${YELLOW}No changes detected. Make some edits first!${NC}"
    exit 0
fi

# Show what changed
echo -e "${YELLOW}📝 Changes detected:${NC}"
git status --short
echo ""

# Step 2: Stage and commit
read -p "Commit message (or press Enter for default): " MSG
MSG=${MSG:-"Update site content $(date +%Y-%m-%d)"}

git add -A
git commit -m "$MSG"
echo ""
echo -e "${GREEN}✓ Changes saved to Git${NC}"

# Step 3: Push to GitHub
echo -e "${YELLOW}⬆ Pushing to GitHub...${NC}"
git push
echo -e "${GREEN}✓ Pushed to GitHub${NC}"
echo ""

# Step 4: Build the site
echo -e "${YELLOW}🔨 Building the site...${NC}"
bun run build
echo -e "${GREEN}✓ Build complete${NC}"
echo ""

# Step 5: Deploy to Surge
echo -e "${YELLOW}🚀 Deploying to Surge...${NC}"

# Use the domain from CNAME if it exists, otherwise prompt
if [ -f "dist/client/CNAME" ]; then
    DOMAIN=$(cat dist/client/CNAME)
    npx surge dist/client "$DOMAIN"
elif [ -f "SURGE_DOMAIN" ]; then
    DOMAIN=$(cat SURGE_DOMAIN)
    npx surge dist/client "$DOMAIN"
else
    echo -e "${YELLOW}No saved domain found. Enter your Surge domain:${NC}"
    read -p "(e.g. durrant-guitars.surge.sh): " DOMAIN
    npx surge dist/client "$DOMAIN"
    # Save for next time
    echo "$DOMAIN" > SURGE_DOMAIN
    echo -e "${GREEN}✓ Domain saved to SURGE_DOMAIN for next time${NC}"
fi

echo ""
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ All done! Site is live.            ${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo ""
