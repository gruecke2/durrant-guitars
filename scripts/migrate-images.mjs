/**
 * Image Migration Script
 * Copies images from the old directory structure to Keystatic-compatible locations
 * and updates all JSON content files with new paths.
 *
 * Run: node scripts/migrate-images.mjs
 */

import { cpSync, mkdirSync, readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';

const ROOT = process.cwd();
const IMG_BASE = join(ROOT, 'src/assets/images/site');
const CONTENT = join(ROOT, 'src/content');

// ─── Step 1: Create new directories ───────────────────────────
const newDirs = [
    join(IMG_BASE, 'catalog'),
    join(IMG_BASE, 'available'),
    join(IMG_BASE, 'gallery'),
    join(IMG_BASE, 'workshop'),
];
for (const dir of newDirs) {
    mkdirSync(dir, { recursive: true });
    console.log(`✓ Created ${dir}`);
}

// ─── Step 2: Process each collection ──────────────────────────

function resolveOldPath(relPath) {
    // relPath looks like "../../assets/images/site/Catalog Photos/Grifter/file.jpg"
    // We need to resolve from src/content/{collection}/
    // But we can just extract everything after "images/site/"
    const marker = 'images/site/';
    const idx = relPath.indexOf(marker);
    if (idx === -1) throw new Error(`Unexpected path format: ${relPath}`);
    const subPath = relPath.substring(idx + marker.length);
    return join(IMG_BASE, subPath);
}

function migrateCollection(collectionName, targetDir) {
    const collDir = join(CONTENT, collectionName);
    const files = readdirSync(collDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const filePath = join(collDir, file);
        const data = JSON.parse(readFileSync(filePath, 'utf-8'));
        const entrySlug = file.replace('.json', '');

        if (!data.images || !Array.isArray(data.images)) continue;

        // Create entry subdirectory
        const entryDir = join(targetDir, entrySlug);
        mkdirSync(entryDir, { recursive: true });

        const newPaths = [];
        for (const imgPath of data.images) {
            const oldAbsPath = resolveOldPath(imgPath);
            const filename = basename(oldAbsPath);
            const newAbsPath = join(entryDir, filename);

            if (existsSync(oldAbsPath)) {
                cpSync(oldAbsPath, newAbsPath, { force: true });
                console.log(`  📸 ${filename} → ${collectionName}/${entrySlug}/`);
            } else {
                console.warn(`  ⚠ Missing: ${oldAbsPath}`);
            }

            // New relative path from content dir to image
            const newRelPath = `../../assets/images/site/${collectionName}/${entrySlug}/${filename}`;
            newPaths.push(newRelPath);
        }

        data.images = newPaths;
        writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
        console.log(`  ✓ Updated ${file}`);
    }
}

console.log('\n──── Catalog ────');
migrateCollection('catalog', join(IMG_BASE, 'catalog'));

console.log('\n──── Available ────');
migrateCollection('available', join(IMG_BASE, 'available'));

console.log('\n──── Gallery ────');
migrateCollection('gallery', join(IMG_BASE, 'gallery'));

// ─── Step 3: Workshop photos (masonry bucket) ─────────────────
console.log('\n──── Workshop Photos ────');

const workshopDir = join(IMG_BASE, 'workshop');
mkdirSync(workshopDir, { recursive: true });

// These are the photos used by the masonry grid via import.meta.glob
const workshopGlobs = [
    { pattern: /^build_/, label: 'build' },
    { pattern: /^gold-racketeer/, label: 'gold-racketeer' },
    { pattern: /^dust-racketeer/, label: 'dust-racketeer' },
];

const pastBuildDir = join(IMG_BASE, 'Past Build Photos');
const allPastFiles = readdirSync(pastBuildDir).filter(f =>
    f.match(/\.(jpg|jpeg|png)$/i)
);

const workshopFiles = [];

for (const file of allPastFiles) {
    const isWorkshop = workshopGlobs.some(g => g.pattern.test(file));
    if (isWorkshop) {
        const src = join(pastBuildDir, file);
        const dest = join(workshopDir, file);
        cpSync(src, dest, { force: true });
        workshopFiles.push(`../../assets/images/site/workshop/${file}`);
        console.log(`  📸 ${file} → workshop/`);
    }
}

// Create the workshop-photos singleton data
const workshopData = { photos: workshopFiles };
const workshopJsonPath = join(CONTENT, 'workshop-photos.json');
writeFileSync(workshopJsonPath, JSON.stringify(workshopData, null, 2) + '\n');
console.log(`  ✓ Created workshop-photos.json with ${workshopFiles.length} photos`);

console.log('\n════════════════════════════════════');
console.log('✅ Migration complete!');
console.log('════════════════════════════════════\n');
