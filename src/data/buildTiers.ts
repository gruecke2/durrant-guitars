/**
 * Public build tier ladder — shared by catalog pages, hero CTA, and commission form.
 * Tier 4 is quoted as “anything”; we still show a floor price for consistency in the UI.
 */

export type BuildTierSlug =
    | 'justifiable'
    | 'questionable'
    | 'irresponsible'
    | 'fuck-you-money';

export interface BuildTier {
    slug: BuildTierSlug;
    /** Short label for selects and emails */
    label: string;
    /** Full line shown on the catalog detail card */
    headline: string;
    /** Shown as “starts at” in the UI */
    price: number;
    /** Bullets added at this tier only (cumulative list built separately) */
    additions: readonly string[];
}

export const BUILD_TIERS: readonly BuildTier[] = [
    {
        slug: 'justifiable',
        label: 'Justifiable',
        headline: 'Tier 1 — Justifiable',
        price: 2500,
        additions: [
            'Bolt-on neck',
            '1-piece neck',
            'Flat scoop headstock (Fender style)',
            'Unfinished or matte/satin finished fretboard wood',
            'Dot fretboard inlays',
            'Standard nickel/silver frets',
            '22 frets',
            '24.75″ (Gibson) or 25.5″ (Fender) scale length',
            'Solid body — any pre-existing silhouette',
            'Single-color paint',
            'Single-color or simple burst dye',
            'Matte/satin finish',
            'Tune-o-matic, hardtail, or Tele-style bridge',
            'Standard volume, tone, and switch circuit',
        ],
    },
    {
        slug: 'questionable',
        label: 'Questionable',
        headline: 'Tier 2 — Questionable',
        price: 3300,
        additions: [
            'Everything in Justifiable, plus:',
            'Set neck',
            'Laminate neck',
            'Angled headstock',
            'Gloss finished fretboard wood',
            'Custom fretboard inlays',
            'Stainless steel or gold frets',
            '24 frets',
            'Any custom scale length',
            '1-ply plastic neck and body binding',
            'Chambered body',
            '¼″ drop top',
            'Fabric top',
            'Gloss finish',
            'Strat-style tremolo or Bigsby bridge',
            'Custom circuitry',
        ],
    },
    {
        slug: 'irresponsible',
        label: 'Irresponsible',
        headline: 'Tier 3 — Irresponsible',
        price: 4500,
        additions: [
            'Everything in Questionable, plus:',
            'Through neck',
            'Compound radius',
            'Multiple-ply binding',
            'Wood binding',
            'Custom body shape',
            'Semi-hollow body',
            '¾″ carved top',
            'Floyd Rose bridge',
        ],
    },
    {
        slug: 'fuck-you-money',
        label: 'Fuck You Money',
        headline: 'Tier 4 — Fuck You Money',
        price: 5500,
        additions: [
            'Anything — one-of-a-kind ideas, wild materials, experimental layouts; scope and final pricing are quoted together.',
        ],
    },
] as const;

export function cumulativeBullets(tierIndex: number): string[] {
    if (tierIndex < 0 || tierIndex >= BUILD_TIERS.length) return [...BUILD_TIERS[0].additions];
    if (tierIndex === BUILD_TIERS.length - 1) {
        return [...BUILD_TIERS[BUILD_TIERS.length - 1].additions];
    }
    const out: string[] = [];
    for (let i = 0; i <= tierIndex; i++) {
        out.push(...BUILD_TIERS[i].additions);
    }
    return out;
}

export function tierIndexFromSlug(slug: string | null | undefined): number {
    if (!slug) return 0;
    const normalized = slug.toLowerCase().trim();
    const idx = BUILD_TIERS.findIndex((t) => t.slug === normalized);
    return idx === -1 ? 0 : idx;
}

export function formatTierPrice(price: number): string {
    return `$${price.toLocaleString('en-US')}`;
}
