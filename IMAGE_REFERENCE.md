# Durrant Guitars — Image Asset Reference

This document catalogs every image in `src/assets/images/` with its descriptive filename
and what it actually shows. Use this guide when selecting images for the site.

## Naming Schema

```
{model}_{view}-{detail}_{number}.{ext}
```

- **model**: Guitar model name or category (racketeer, con-artist, grifter, charlatan, swindler, headstock, tom, bass, build)
- **view**: Perspective (front, back, closeup, full, portrait, live, lifestyle, workshop)
- **detail**: Specific subject (body, headstock, bridge, fretboard, pickups, neck-joint, etc.)
- **number**: Sequential `_01`, `_02`, etc.
- **ext**: Always lowercase

---

## ⚠️ Image Selection Guidelines for AI Agents

When picking images for prominent positions (hero sections, catalog cards, featured models):

1. **ALWAYS prefer `front-*` images** for hero/card positions
2. **NEVER use `back-*` images** as the primary/first image
3. **Use `closeup-*` images** for detail sections or secondary slots
4. **Use `lifestyle-*` images** for editorial/story sections
5. The **first image in any `images[]` array** should always be a front-facing shot

---

## Logo (`images/logo/`)

| File | Description |
|------|-------------|
| `logo_only.jpg` | Square logo mark only (used in header) |
| `durrant_white-on-black.jpg` | Full logo, white text on black |
| `white_on_black.jpg` | Alternative white-on-black logo |

## Catalog Photos — Racketeer (`images/site/Catalog Photos/Racketeer/`)

Offset/Jazzmaster-style guitar. Matte black open-pore finish with gold hardware.

| File | View | Description |
|------|------|-------------|
| `racketeer_front-body_01.jpg` | Front | Closeup of front body, studio white bg |
| `racketeer_front-body_02.jpg` | Front | Similar front body closeup, slightly different angle |
| `racketeer_front-body-dark_01.jpg` | Front | Body closeup on solid black background |
| `racketeer_front-full_01.jpg` | Front | **Full body shot** — best for cards/heroes |
| `racketeer_front-pickups_01.jpg` | Front | Closeup of P90 pickups and controls |
| `racketeer_back-body_01.jpg` | Back | Rear view showing neck heel and body |
| `racketeer_closeup-headstock_01.jpg` | Front | Headstock detail with Durrant logo |

## Catalog Photos — Con Artist (`images/site/Catalog Photos/Con Artist/`)

Les Paul-style single cutaway. Red-to-purple burst with figured maple top, gold hardware.

| File | View | Description |
|------|------|-------------|
| `con-artist_front-full_01.jpg` | Front | **Full body shot** — best for cards/heroes |
| `con-artist_closeup-bridge_01.jpg` | Front | Bridge and lower body detail |
| `con-artist_closeup-headstock_01.jpg` | Front | Angled headstock with gold logo |
| `con-artist_closeup-fretboard_01.jpg` | Front | Horizontal fretboard/headstock detail |
| `con-artist_back-full_01.jpg` | Back | Full rear view, natural wood finish |
| `con-artist_lifestyle-outdoor_01.jpg` | Lifestyle | Guitar leaning on tree outdoors |

## Catalog Photos — Grifter (`images/site/Catalog Photos/Grifter/`)

Telecaster-style. Dark metallic teal/forest green finish. Pink/blue studio lighting.

| File | View | Description |
|------|------|-------------|
| `grifter_front-full_01.jpg` | Front | **Full body shot** — best for cards/heroes |
| `grifter_back-full_01.jpg` | Back | Full body rear view |
| `grifter_closeup-bridge_01.jpg` | Front | Bridge and white pickups detail |
| `grifter_back-neckjoint_01.jpg` | Back | Neck joint closeup |
| `grifter_back-body_01.jpg` | Back | Body and string ferrules detail |

## Headstock Photos (`images/site/Durrant Head Stock Photos/`)

Closeup shots of the Durrant logo headstock. Two lighting setups: dark (purple/magenta) and light (warm/natural).

| File | Lighting | Description |
|------|----------|-------------|
| `headstock_closeup-front-dark_01.jpg` | Dark | Frontal headstock, purple lights — **used as homepage hero** |
| `headstock_closeup-top-dark_01.jpg` | Dark | Top-down view of headstock |
| `headstock_closeup-side-dark_01.jpg` | Dark | Low side angle |
| `headstock_closeup-front-light_01.jpg` | Light | Side/top angle, natural headstock |
| `headstock_closeup-side-light_01.jpg` | Light | Profile showing wood grain depth |
| `headstock_lifestyle-angle_01.jpg` | Light | Angled up the neck toward player |

## Tom Photos (`images/site/Tom Photos/`)

Photos of Tom Durrant — portraits, playing shots, and live performance.

| File | Type | Description |
|------|------|-------------|
| `tom_portrait-guitar_01.jpg` | Portrait | Tom smiling, holding guitar, warm side light — **used for About page** |
| `tom_portrait-studio_01.jpg` | Portrait | Tom front-on with guitar, white studio |
| `tom_portrait-playing_01.jpg` | Portrait | Tom looking down at guitar while playing |
| `tom_portrait-playing_02.jpg` | Portrait | Tom playing, frontal view |
| `tom_portrait-candid_01.jpg` | Portrait | Candid shot holding guitar |
| `tom_closeup-hands-playing_01.jpg` | Detail | Hands on purple flame maple guitar body |
| `tom_closeup-hands-strumming_01.jpg` | Detail | Hands strumming purple guitar |
| `tom_closeup-hands-bridge_01.jpg` | Detail | Hands near bridge of black guitar |
| `tom_live-performance_01.jpg` | Live | On-stage performance shot, vivid colors |

## Testimonial Photos (`images/site/Testimonial Photos/`)

| File | Description |
|------|-------------|
| `testimonial_brogan-durrant_01.jpg` | Brogan with a Durrant guitar |

## Past Build Photos (`images/site/Past Build Photos/`)

### Charlatan (Guitar4) — Purple/blue burst flame maple double-cut

| File | View | Description |
|------|------|-------------|
| `charlatan_front-body_01.jpg` | Front | Body upper section, vibrant purple flame |
| `charlatan_back-neckjoint_01.jpg` | Back | Neck heel detail, natural wood |
| `charlatan_closeup-bridge_01.jpg` | Front | Bridge/pickups detail, blue studio bg |
| `charlatan_closeup-pickups_01.jpg` | Front | Pickups center detail |
| `charlatan_front-carve_01.jpg` | Front | Top carve detail, angled |
| `charlatan_closeup-body_01.jpg` | Front | Body detail, tilted |

### Swindler (Guitar5) — Double-neck paisley pattern

| File | View | Description |
|------|------|-------------|
| `swindler_front-angled_01.jpg` | Front | Angled front on stand, workshop |
| `swindler_closeup-body_01.jpg` | Front | Body detail with dark glow bg |
| `swindler_closeup-necks_01.jpg` | Front | Neck bases with vine inlays |
| `swindler_closeup-bridge_01.jpg` | Front | Bridge/controls, black bg |

### Bass — Black body, red pearloid pickguard

| File | View | Description |
|------|------|-------------|
| `bass_front-angled_01.png` | Front | Angled on stand, black bg |
| `bass_front-full_01.jpg` | Front | Full front view, vignette lighting |
| `bass_closeup-controls_01.jpg` | Front | Controls, pickups, and bridge detail |
| `bass_closeup-pickguard_01.jpg` | Front | Red pearloid pickguard detail |
| `bass_closeup-headstock_01.jpg` | Front | Maple headstock, gold tuners |
| `bass_closeup-body_01.jpg` | Front | Lower body angled detail |

### Workshop Builds — Silver sparkle headstock

| File | Description |
|------|-------------|
| `build_workshop-headstock-sparkle_01.png` | Angled headstock on workbench |
| `build_workshop-headstock-sparkle_02.png` | Frontal sparkle headstock |

### Workshop Builds — Natural semi-hollow

| File | Description |
|------|-------------|
| `build_workshop-semihollow-natural_01.png` | Full guitar on stand, workshop floor |

### Workshop Builds — Seafoam green offset

| File | Description |
|------|-------------|
| `build_workshop-offset-seafoam_01.png` | Angled front, workshop/garage |
| `build_workshop-offset-seafoam_02.jpg` | Pickups and pickguard closeup |
| `build_workshop-offset-seafoam_03.png` | Full front view on stand |
| `build_workshop-offset-seafoam-headstock_01.png` | Matching headstock detail |

### Workshop Builds — Red semi-hollow

| File | Description |
|------|-------------|
| `build_semihollow-red-angled_01.png` | Angled on dark wood wall, showroom |
| `build_semihollow-red-headstock_01.png` | Red headstock, gold tuners |
| `build_semihollow-red-full_01.png` | Full front view, black backdrop |

### Catalog Duplicates (in Past Build Photos)

The following are copies of the Catalog Photos that also reside in this folder.
They follow the same naming pattern as their catalog originals:

- `racketeer_front-body_01.jpg` through `racketeer_front-pickups_01.jpg`
- `con-artist_front-full_01.jpg` through `con-artist_lifestyle-outdoor_01.jpg`
- `grifter_front-full_01.jpg` through `grifter_back-body_01.jpg`
