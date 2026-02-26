#!/bin/bash
# =============================================================================
# Image Rename Script for Durrant Guitars
# =============================================================================
# Naming Schema: {model}_{view}-{detail}_{number}.{ext}
#
# Models: racketeer, con-artist, grifter, charlatan, swindler
# Categories: headstock, tom, bass, build
# Views: front, back, closeup, full, portrait, live, workshop
# Details: body, headstock, bridge, neck-joint, fretboard, full-body, etc.
#
# All extensions normalized to lowercase.
# All "Copy of " prefixes removed.
# =============================================================================

set -e

BASE="c:/dev/tom-site/durrant-guitars/src"
ASSETS="$BASE/assets/images"

echo "=== Durrant Guitars Image Rename Script ==="
echo ""

# Track old->new mappings for reference updates
declare -A RENAME_MAP

rename_file() {
    local old_path="$1"
    local new_path="$2"
    
    if [ "$old_path" = "$new_path" ]; then
        echo "  SKIP (same): $old_path"
        return
    fi
    
    if [ ! -f "$old_path" ]; then
        echo "  WARN: File not found: $old_path"
        return
    fi
    
    echo "  RENAME: $(basename "$old_path") -> $(basename "$new_path")"
    mv "$old_path" "$new_path"
    RENAME_MAP["$old_path"]="$new_path"
}

# ============================================================================
# 1. LOGO FOLDER (already fine, just normalize extensions)
# ============================================================================
echo "--- Logo Files ---"
# These are fine as-is, just normalize case
if [ -f "$ASSETS/images/logo/durrant_whiteOnBlack.JPG" ]; then
    rename_file "$ASSETS/images/logo/durrant_whiteOnBlack.JPG" "$ASSETS/images/logo/durrant_white-on-black.jpg"
fi
if [ -f "$ASSETS/images/logo/logo_only.JPEG" ]; then
    rename_file "$ASSETS/images/logo/logo_only.JPEG" "$ASSETS/images/logo/logo_only.jpg"
fi
if [ -f "$ASSETS/images/logo/white_on_black.JPG" ]; then
    rename_file "$ASSETS/images/logo/white_on_black.JPG" "$ASSETS/images/logo/white_on_black.jpg"
fi

# ============================================================================
# 2. CATALOG PHOTOS - RACKETEER (Guitar1 series, offset/jazzmaster, black w/ gold hw)
# ============================================================================
echo ""
echo "--- Catalog: Racketeer ---"
RACK_DIR="$ASSETS/site/Catalog Photos/Racketeer"

# Guitar1-1:  Front closeup, body, studio       -> racketeer_front-body_01.jpg
# Guitar1-2:  Front closeup, body (similar)      -> racketeer_front-body_02.jpg  
# Guitar1-4:  Back closeup, body & neck heel     -> racketeer_back-body_01.jpg
# Guitar1-5:  Front full body                    -> racketeer_front-full_01.jpg
# Guitar1-7:  Front closeup, body, dark bg       -> racketeer_front-body-dark_01.jpg
# Guitar1-11: Front closeup, headstock           -> racketeer_closeup-headstock_01.jpg
# Guitar1-12: Front closeup, body (pickups)      -> racketeer_front-pickups_01.jpg

rename_file "$RACK_DIR/Copy of Guitar1-1.jpg"    "$RACK_DIR/racketeer_front-body_01.jpg"
rename_file "$RACK_DIR/Copy of Guitar1-2.JPG"    "$RACK_DIR/racketeer_front-body_02.jpg"
rename_file "$RACK_DIR/Copy of Guitar1-4.jpg"    "$RACK_DIR/racketeer_back-body_01.jpg"
rename_file "$RACK_DIR/Copy of Guitar1-5.jpg"    "$RACK_DIR/racketeer_front-full_01.jpg"
rename_file "$RACK_DIR/Copy of Guitar1-7.jpg"    "$RACK_DIR/racketeer_front-body-dark_01.jpg"
rename_file "$RACK_DIR/Copy of Guitar1-11.JPG"   "$RACK_DIR/racketeer_closeup-headstock_01.jpg"
rename_file "$RACK_DIR/Copy of Guitar1-12.JPG"   "$RACK_DIR/racketeer_front-pickups_01.jpg"

# ============================================================================
# 3. CATALOG PHOTOS - CON ARTIST (Guitar2 series, single cut LP-style, red burst)
# ============================================================================
echo ""
echo "--- Catalog: Con Artist ---"
CON_DIR="$ASSETS/site/Catalog Photos/Con Artist"

# Guitar2-1:  Front full body, studio            -> con-artist_front-full_01.jpg
# Guitar2-4:  Front closeup, bridge/lower body   -> con-artist_closeup-bridge_01.jpg
# Guitar2-5:  Closeup headstock, angled           -> con-artist_closeup-headstock_01.jpg
# Guitar2-6:  Back full body                      -> con-artist_back-full_01.jpg
# Guitar2-8:  Closeup fretboard/headstock horiz   -> con-artist_closeup-fretboard_01.jpg
# Guitar2-10: Lifestyle, leaning on tree          -> con-artist_lifestyle-outdoor_01.jpg

rename_file "$CON_DIR/Copy of Guitar2-1.jpg"     "$CON_DIR/con-artist_front-full_01.jpg"
rename_file "$CON_DIR/Copy of Guitar2-4.jpg"     "$CON_DIR/con-artist_closeup-bridge_01.jpg"
rename_file "$CON_DIR/Copy of Guitar2-5.jpg"     "$CON_DIR/con-artist_closeup-headstock_01.jpg"
rename_file "$CON_DIR/Copy of Guitar2-6.JPG"     "$CON_DIR/con-artist_back-full_01.jpg"
rename_file "$CON_DIR/Copy of Guitar2-8.jpg"     "$CON_DIR/con-artist_closeup-fretboard_01.jpg"
rename_file "$CON_DIR/Copy of Guitar2-10.jpg"    "$CON_DIR/con-artist_lifestyle-outdoor_01.jpg"

# ============================================================================
# 4. CATALOG PHOTOS - GRIFTER (Guitar3 series, tele-style, teal/green)
# ============================================================================
echo ""
echo "--- Catalog: Grifter ---"
GRIF_DIR="$ASSETS/site/Catalog Photos/Grifter"

# Guitar3-3:  Front full body                    -> grifter_front-full_01.jpg
# Guitar3-4:  Back full body                     -> grifter_back-full_01.jpg
# Guitar3-5:  Front closeup, bridge/pickups      -> grifter_closeup-bridge_01.jpg
# Guitar3-8:  Back closeup, neck joint           -> grifter_back-neckjoint_01.jpg
# Guitar3-9:  Back closeup, body/ferrules        -> grifter_back-body_01.jpg

rename_file "$GRIF_DIR/Copy of Guitar3-3.jpg"    "$GRIF_DIR/grifter_front-full_01.jpg"
rename_file "$GRIF_DIR/Copy of Guitar3-4.jpg"    "$GRIF_DIR/grifter_back-full_01.jpg"
rename_file "$GRIF_DIR/Copy of Guitar3-5.JPG"    "$GRIF_DIR/grifter_closeup-bridge_01.jpg"
rename_file "$GRIF_DIR/Copy of Guitar3-8.JPG"    "$GRIF_DIR/grifter_back-neckjoint_01.jpg"
rename_file "$GRIF_DIR/Copy of Guitar3-9.JPG"    "$GRIF_DIR/grifter_back-body_01.jpg"

# ============================================================================
# 5. HEADSTOCK PHOTOS  
# ============================================================================
echo ""
echo "--- Headstock Photos ---"
HEAD_DIR="$ASSETS/site/Durrant Head Stock Photos"

# Live1-7:  Headstock closeup, red/purple cap, dark bg    -> headstock_closeup-top-dark_01.jpg
# Live1-8:  Headstock closeup, red/purple, purple lights  -> headstock_closeup-front-dark_01.jpg  (USED AS HERO)
# Live1-9:  Headstock closeup, red/purple, low angle      -> headstock_closeup-side-dark_01.jpg
# Live2-5:  Headstock lifestyle, natural, angled up neck   -> headstock_lifestyle-angle_01.jpg
# Live2-6:  Headstock closeup, natural, side/top           -> headstock_closeup-front-light_01.jpg
# Live2-7:  Headstock closeup, natural, side profile       -> headstock_closeup-side-light_01.jpg

rename_file "$HEAD_DIR/Live1-7.JPG"              "$HEAD_DIR/headstock_closeup-top-dark_01.jpg"
rename_file "$HEAD_DIR/Live1-8.JPG"              "$HEAD_DIR/headstock_closeup-front-dark_01.jpg"
rename_file "$HEAD_DIR/Live1-9.JPG"              "$HEAD_DIR/headstock_closeup-side-dark_01.jpg"
rename_file "$HEAD_DIR/Copy of Live2-5.JPG"      "$HEAD_DIR/headstock_lifestyle-angle_01.jpg"
rename_file "$HEAD_DIR/Copy of Live2-6.JPG"      "$HEAD_DIR/headstock_closeup-front-light_01.jpg"
rename_file "$HEAD_DIR/Copy of Live2-7.JPG"      "$HEAD_DIR/headstock_closeup-side-light_01.jpg"

# ============================================================================
# 6. TOM PHOTOS
# ============================================================================
echo ""
echo "--- Tom Photos ---"
TOM_DIR="$ASSETS/site/Tom Photos"

# Meet Tom Section:     Portrait, Tom holding guitar, warm light  -> tom_portrait-guitar_01.jpg
# Live2-10:             Portrait, Tom front-on with guitar         -> tom_portrait-studio_01.jpg
# Live2-12:             Portrait, Tom looking down at guitar       -> tom_portrait-playing_01.jpg
# Live2-13:             Portrait, Tom playing, front               -> tom_portrait-playing_02.jpg
# Live2-15:             Portrait, Tom candid, holding guitar       -> tom_portrait-candid_01.jpg
# Live1-1:              Closeup hands on purple guitar body        -> tom_closeup-hands-playing_01.jpg
# Live1-5:              Closeup hands strumming purple guitar      -> tom_closeup-hands-strumming_01.jpg
# Live2-1:              Closeup hands on black guitar bridge       -> tom_closeup-hands-bridge_01.jpg
# Potential First...:   Live performance, colorful stage           -> tom_live-performance_01.jpg

rename_file "$TOM_DIR/Meet Tom Section.JPG"                                            "$TOM_DIR/tom_portrait-guitar_01.jpg"
rename_file "$TOM_DIR/Copy of Live2-10.JPG"                                            "$TOM_DIR/tom_portrait-studio_01.jpg"
rename_file "$TOM_DIR/Copy of Live2-12.JPG"                                            "$TOM_DIR/tom_portrait-playing_01.jpg"
rename_file "$TOM_DIR/Copy of Live2-13.jpg"                                            "$TOM_DIR/tom_portrait-playing_02.jpg"
rename_file "$TOM_DIR/Copy of Live2-15.JPG"                                            "$TOM_DIR/tom_portrait-candid_01.jpg"
rename_file "$TOM_DIR/Live1-1.JPG"                                                     "$TOM_DIR/tom_closeup-hands-playing_01.jpg"
rename_file "$TOM_DIR/Live1-5.JPG"                                                     "$TOM_DIR/tom_closeup-hands-strumming_01.jpg"
rename_file "$TOM_DIR/Live2-1.JPG"                                                     "$TOM_DIR/tom_closeup-hands-bridge_01.jpg"
rename_file "$TOM_DIR/Potential First photo in B&W with 50_ opacity over.JPG"          "$TOM_DIR/tom_live-performance_01.jpg"

# ============================================================================
# 7. TESTIMONIAL PHOTOS
# ============================================================================
echo ""
echo "--- Testimonial Photos ---"
TEST_DIR="$ASSETS/site/Testimonial Photos"
# Only 1 file, already well-named — just normalize
rename_file "$TEST_DIR/Brogan Durrant Guitar 3.jpg"  "$TEST_DIR/testimonial_brogan-durrant_01.jpg"

# ============================================================================
# 8. PAST BUILD PHOTOS
# ============================================================================
echo ""
echo "--- Past Build Photos ---"
PAST_DIR="$ASSETS/site/Past Build Photos"

# --- Duplicates of Catalog Photos (Guitar1, 2, 3 series = already renamed in catalog) ---
# These are "Copy of Copy of" versions. Rename them consistently too.
echo "  (Catalog duplicates in Past Builds)"

# Racketeer duplicates
rename_file "$PAST_DIR/Copy of Copy of Guitar1-1.jpg"    "$PAST_DIR/racketeer_front-body_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar1-2.JPG"    "$PAST_DIR/racketeer_front-body_02.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar1-4.jpg"    "$PAST_DIR/racketeer_back-body_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar1-5.jpg"    "$PAST_DIR/racketeer_front-full_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar1-7.jpg"    "$PAST_DIR/racketeer_front-body-dark_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar1-11.JPG"   "$PAST_DIR/racketeer_closeup-headstock_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar1-12.JPG"   "$PAST_DIR/racketeer_front-pickups_01.jpg"

# Con Artist duplicates
rename_file "$PAST_DIR/Copy of Copy of Guitar2-1.jpg"    "$PAST_DIR/con-artist_front-full_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar2-4.jpg"    "$PAST_DIR/con-artist_closeup-bridge_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar2-5.jpg"    "$PAST_DIR/con-artist_closeup-headstock_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar2-6.JPG"    "$PAST_DIR/con-artist_back-full_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar2-8.jpg"    "$PAST_DIR/con-artist_closeup-fretboard_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar2-10.jpg"   "$PAST_DIR/con-artist_lifestyle-outdoor_01.jpg"

# Grifter duplicates
rename_file "$PAST_DIR/Copy of Copy of Guitar3-3.jpg"    "$PAST_DIR/grifter_front-full_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar3-4.jpg"    "$PAST_DIR/grifter_back-full_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar3-5.JPG"    "$PAST_DIR/grifter_closeup-bridge_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar3-8.JPG"    "$PAST_DIR/grifter_back-neckjoint_01.jpg"
rename_file "$PAST_DIR/Copy of Copy of Guitar3-9.JPG"    "$PAST_DIR/grifter_back-body_01.jpg"

# --- Charlatan (Guitar4 series, double-cut SG-style, purple/blue burst flame) ---
echo "  (Charlatan - Guitar4 series)"
rename_file "$PAST_DIR/Copy of Guitar4-1.jpg"    "$PAST_DIR/charlatan_front-body_01.jpg"
rename_file "$PAST_DIR/Copy of Guitar4-2.jpg"    "$PAST_DIR/charlatan_back-neckjoint_01.jpg"
rename_file "$PAST_DIR/Copy of Guitar4-3.JPG"    "$PAST_DIR/charlatan_closeup-bridge_01.jpg"
rename_file "$PAST_DIR/Copy of Guitar4-4.JPG"    "$PAST_DIR/charlatan_closeup-pickups_01.jpg"
rename_file "$PAST_DIR/Copy of Guitar4-5.jpg"    "$PAST_DIR/charlatan_front-carve_01.jpg"
rename_file "$PAST_DIR/Copy of Guitar4-6.JPG"    "$PAST_DIR/charlatan_closeup-body_01.jpg"

# --- Swindler (Guitar5 series, double-neck paisley)---
echo "  (Swindler - Guitar5 series)"
rename_file "$PAST_DIR/Copy of Guitar5-1.jpg"    "$PAST_DIR/swindler_front-angled_01.jpg"
rename_file "$PAST_DIR/Copy of Guitar5-2.JPG"    "$PAST_DIR/swindler_closeup-body_01.jpg"
rename_file "$PAST_DIR/Copy of Guitar5-3.JPG"    "$PAST_DIR/swindler_closeup-necks_01.jpg"
rename_file "$PAST_DIR/Copy of Guitar5-4.jpg"    "$PAST_DIR/swindler_closeup-bridge_01.jpg"

# --- BKK series (Black bass with red pickguard) ---
echo "  (Past Build - Bass)"
rename_file "$PAST_DIR/Copy of BKK_1331 (1).png"              "$PAST_DIR/bass_front-angled_01.png"
rename_file "$PAST_DIR/Copy of BKK_3789 (1).JPG"              "$PAST_DIR/bass_closeup-controls_01.jpg"
rename_file "$PAST_DIR/Copy of BKK_3798-Enhanced-NR.JPG"      "$PAST_DIR/bass_closeup-pickguard_01.jpg"
rename_file "$PAST_DIR/Copy of BKK_3840-Enhanced-NR (1).JPG"  "$PAST_DIR/bass_closeup-headstock_01.jpg"
rename_file "$PAST_DIR/Copy of BKK_8045-Enhanced-NR-2 (1).JPG" "$PAST_DIR/bass_closeup-body_01.jpg"
rename_file "$PAST_DIR/Copy of BKK_8064 (1).jpg"              "$PAST_DIR/bass_front-full_01.jpg"

# --- IMG series (Workshop build photos) ---
echo "  (Workshop builds)"
# Silver sparkle headstock pair
rename_file "$PAST_DIR/Copy of IMG_1653.png"       "$PAST_DIR/build_workshop-headstock-sparkle_01.png"
rename_file "$PAST_DIR/Copy of IMG_1654.png"       "$PAST_DIR/build_workshop-headstock-sparkle_02.png"

# Natural semi-hollow
rename_file "$PAST_DIR/Copy of IMG_3691.png"       "$PAST_DIR/build_workshop-semihollow-natural_01.png"

# Seafoam green offset
rename_file "$PAST_DIR/Copy of IMG_5278 (1).png"   "$PAST_DIR/build_workshop-offset-seafoam_01.png"
rename_file "$PAST_DIR/Copy of IMG_5279 (1).jpg"    "$PAST_DIR/build_workshop-offset-seafoam_02.jpg"
rename_file "$PAST_DIR/Copy of IMG_5287 (1).png"    "$PAST_DIR/build_workshop-offset-seafoam-headstock_01.png"
rename_file "$PAST_DIR/Copy of IMG_5291 (1).png"    "$PAST_DIR/build_workshop-offset-seafoam_03.png"

# Red semi-hollow
rename_file "$PAST_DIR/Copy of IMG_7026.png"       "$PAST_DIR/build_semihollow-red-angled_01.png"
rename_file "$PAST_DIR/Copy of IMG_7029.png"       "$PAST_DIR/build_semihollow-red-headstock_01.png"
rename_file "$PAST_DIR/Copy of IMG_7741.png"       "$PAST_DIR/build_semihollow-red-full_01.png"

echo ""
echo "=== File renames complete ==="
echo ""
echo "Now you need to update references in source files."
echo "See the reference update commands below."
