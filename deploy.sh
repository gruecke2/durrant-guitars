#!/bin/bash

# ─────────────────────────────────────────────────────
#  Durrant Guitars — Save & Deploy (Vercel CLI)
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
    echo -e "${YELLOW}No changes detected. Proceeding to deploy current state...${NC}"
else
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
fi

# Step 4: Deploy to Vercel
echo -e "${YELLOW}🚀 Deploying to Vercel...${NC}"
npx vercel --prod

echo ""
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ All done! Site is live.            ${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo ""
