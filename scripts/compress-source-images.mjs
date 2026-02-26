/**
 * compress-source-images.mjs
 * 
 * Pre-compresses source images IN-PLACE so the Astro build doesn't start
 * with 20-30 MB PNGs. This is a one-time (or occasional) script.
 *
 * What it does:
 *  - Resizes any image wider than MAX_WIDTH down to MAX_WIDTH (preserving aspect ratio)
 *  - Converts PNGs to high-quality JPGs (since these are photos, not graphics)
 *  - Compresses JPGs to QUALITY (85 = excellent visual quality, ~80% smaller)
 *  - Skips logo files (those should stay as-is)
 *  - Prints before/after sizes
 *
 * Usage:  node scripts/compress-source-images.mjs
 *         node scripts/compress-source-images.mjs --dry-run
 */

import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import path from 'path';

const ASSETS_DIR = path.resolve('src/assets/images');
const MAX_WIDTH = 2400;       // No photo needs to be wider than this for web
const JPEG_QUALITY = 85;      // High quality, visually lossless
const DRY_RUN = process.argv.includes('--dry-run');

// Directories/patterns to skip
const SKIP_DIRS = ['logo'];

let totalBefore = 0;
let totalAfter = 0;
let filesProcessed = 0;
let filesSkipped = 0;
let pngsConverted = 0;

async function getAllImageFiles(dir) {
    const results = [];
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (SKIP_DIRS.includes(entry.name.toLowerCase())) {
                console.log(`  ⏭  Skipping directory: ${entry.name}`);
                continue;
            }
            results.push(...await getAllImageFiles(fullPath));
        } else {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                results.push(fullPath);
            }
        }
    }
    return results;
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function processImage(filePath) {
    const relPath = path.relative(ASSETS_DIR, filePath);
    const ext = path.extname(filePath).toLowerCase();
    const beforeStats = await stat(filePath);
    const beforeSize = beforeStats.size;
    totalBefore += beforeSize;

    try {
        const metadata = await sharp(filePath).metadata();
        const isPng = ext === '.png';
        const needsResize = metadata.width > MAX_WIDTH;

        // Skip if it's already a small, optimized jpg that doesn't need resizing
        if (!isPng && !needsResize && beforeSize < 500_000) {
            console.log(`  ✓  ${relPath} — already optimized (${formatBytes(beforeSize)})`);
            totalAfter += beforeSize;
            filesSkipped++;
            return;
        }

        if (DRY_RUN) {
            const wouldConvert = isPng ? ' (PNG → JPG)' : '';
            const wouldResize = needsResize ? ` (${metadata.width}px → ${MAX_WIDTH}px)` : '';
            console.log(`  🔍 ${relPath} — ${formatBytes(beforeSize)}${wouldResize}${wouldConvert} [DRY RUN]`);
            totalAfter += beforeSize;
            return;
        }

        // Build the sharp pipeline
        let pipeline = sharp(filePath);

        if (needsResize) {
            pipeline = pipeline.resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        // Always output as JPEG for photos
        pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });

        // Write to a temp file first (in case of same-name overwrite)
        const newFilePath = isPng
            ? filePath.replace(/\.png$/i, '.jpg')
            : filePath;
        const tempPath = filePath + '.tmp.jpg';

        await pipeline.toFile(tempPath);

        const afterStats = await stat(tempPath);
        const afterSize = afterStats.size;
        totalAfter += afterSize;

        // Replace original file
        if (isPng) {
            // For PNGs: rename temp to .jpg, delete original .png
            await rename(tempPath, newFilePath);
            await unlink(filePath);
            pngsConverted++;
        } else {
            // For JPGs: rename temp over original
            await rename(tempPath, newFilePath);
        }

        const savings = ((1 - afterSize / beforeSize) * 100).toFixed(0);
        const resizeNote = needsResize ? ` (${metadata.width}→${MAX_WIDTH}px)` : '';
        const convertNote = isPng ? ' (PNG→JPG)' : '';

        console.log(`  ✅ ${relPath} — ${formatBytes(beforeSize)} → ${formatBytes(afterSize)} (${savings}% smaller)${resizeNote}${convertNote}`);
        filesProcessed++;

    } catch (err) {
        console.error(`  ❌ ${relPath} — ERROR: ${err.message}`);
        totalAfter += beforeSize; // count original size on error
    }
}

async function main() {
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  Durrant Guitars — Source Image Compression');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Max width: ${MAX_WIDTH}px`);
    console.log(`  JPEG quality: ${JPEG_QUALITY}`);
    console.log(`  Mode: ${DRY_RUN ? '🔍 DRY RUN' : '🔧 LIVE'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');

    const files = await getAllImageFiles(ASSETS_DIR);
    console.log(`  Found ${files.length} image files to process.\n`);

    for (const file of files) {
        await processImage(file);
    }

    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Total before: ${formatBytes(totalBefore)}`);
    console.log(`  Total after:  ${formatBytes(totalAfter)}`);
    console.log(`  Savings:      ${formatBytes(totalBefore - totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
    console.log(`  Files processed: ${filesProcessed}`);
    console.log(`  Files skipped:   ${filesSkipped}`);
    console.log(`  PNGs → JPG:      ${pngsConverted}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    if (pngsConverted > 0 && !DRY_RUN) {
        console.log('');
        console.log('  ⚠️  PNGs were converted to JPGs!');
        console.log('  You MUST update any source references from .png → .jpg');
        console.log('  Check: content/*.json, pages/*.astro, IMAGE_REFERENCE.md');
    }
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
