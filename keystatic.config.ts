import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },

    collections: {
        // ─── Catalog Models ───────────────────────────────────────────
        catalog: collection({
            label: 'Catalog Models',
            slugField: 'name',
            path: 'src/content/catalog/*',
            format: { data: 'json' },
            schema: {
                name: fields.slug({ name: { label: 'Model Name', validation: { isRequired: true } } }),
                slug: fields.text({ label: 'URL Slug', validation: { isRequired: true } }),
                style: fields.text({ label: 'Style (e.g. Tele, Offset, Single Cut)', validation: { isRequired: true } }),
                tagline: fields.text({ label: 'Tagline', validation: { isRequired: true } }),
                description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
                startingPrice: fields.integer({ label: 'Starting Price ($)', validation: { isRequired: true } }),
                specs: fields.object({
                    body: fields.text({ label: 'Body' }),
                    neck: fields.text({ label: 'Neck' }),
                    fretboard: fields.text({ label: 'Fretboard' }),
                    pickups: fields.text({ label: 'Pickups' }),
                    bridge: fields.text({ label: 'Bridge' }),
                }, { label: 'Specifications' }),
                images: fields.array(
                    fields.image({
                        label: 'Photo',
                        directory: 'src/assets/images/site/catalog',
                        publicPath: '../../assets/images/site/catalog/',
                    }),
                    {
                        label: 'Photos',
                        itemLabel: (props) => {
                            const val = props.value;
                            if (val && typeof val === 'object' && 'filename' in val) {
                                return (val as { filename: string }).filename;
                            }
                            return 'Photo';
                        },
                    },
                ),
            },
        }),

        // ─── Available Inventory ──────────────────────────────────────
        available: collection({
            label: 'Available Inventory',
            slugField: 'name',
            path: 'src/content/available/*',
            format: { data: 'json' },
            schema: {
                name: fields.slug({ name: { label: 'Guitar Name', validation: { isRequired: true } } }),
                slug: fields.text({ label: 'URL Slug', validation: { isRequired: true } }),
                model: fields.text({ label: 'Model Reference', validation: { isRequired: true } }),
                price: fields.integer({ label: 'Price ($)', validation: { isRequired: true } }),
                status: fields.select({
                    label: 'Status',
                    options: [
                        { label: 'Available', value: 'available' },
                        { label: 'Sold', value: 'sold' },
                    ],
                    defaultValue: 'available',
                }),
                description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
                stripePaymentLink: fields.url({ label: 'Stripe Payment Link' }),
                images: fields.array(
                    fields.image({
                        label: 'Photo',
                        directory: 'src/assets/images/site/available',
                        publicPath: '../../assets/images/site/available/',
                    }),
                    {
                        label: 'Photos',
                        itemLabel: (props) => {
                            const val = props.value;
                            if (val && typeof val === 'object' && 'filename' in val) {
                                return (val as { filename: string }).filename;
                            }
                            return 'Photo';
                        },
                    },
                ),
                specs: fields.object({
                    body: fields.text({ label: 'Body' }),
                    finish: fields.text({ label: 'Finish' }),
                    neck: fields.text({ label: 'Neck' }),
                    fretboard: fields.text({ label: 'Fretboard' }),
                    pickups: fields.text({ label: 'Pickups' }),
                    bridge: fields.text({ label: 'Bridge' }),
                    weight: fields.text({ label: 'Weight' }),
                }, { label: 'Specifications' }),
            },
        }),

        // ─── Gallery / Past Builds ────────────────────────────────────
        gallery: collection({
            label: 'Gallery',
            slugField: 'title',
            path: 'src/content/gallery/*',
            format: { data: 'json' },
            schema: {
                title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
                model: fields.text({ label: 'Model' }),
                description: fields.text({ label: 'Description', multiline: true }),
                images: fields.array(
                    fields.image({
                        label: 'Photo',
                        directory: 'src/assets/images/site/gallery',
                        publicPath: '../../assets/images/site/gallery/',
                    }),
                    {
                        label: 'Photos',
                        itemLabel: (props) => {
                            const val = props.value;
                            if (val && typeof val === 'object' && 'filename' in val) {
                                return (val as { filename: string }).filename;
                            }
                            return 'Photo';
                        },
                    },
                ),
                date: fields.text({ label: 'Date (YYYY-MM-DD)' }),
            },
        }),

        // ─── Testimonials ─────────────────────────────────────────────
        testimonials: collection({
            label: 'Testimonials',
            slugField: 'name',
            path: 'src/content/testimonials/*',
            format: { data: 'json' },
            schema: {
                name: fields.slug({ name: { label: 'Customer Name', validation: { isRequired: true } } }),
                role: fields.text({ label: 'Role / Title' }),
                quote: fields.text({ label: 'Quote', multiline: true, validation: { isRequired: true } }),
                photo: fields.image({
                    label: 'Photo',
                    directory: 'src/assets/images/site/testimonials',
                    publicPath: '../../assets/images/site/testimonials/',
                }),
                order: fields.integer({ label: 'Display Order' }),
            },
        }),
    },

    singletons: {
        // ─── Workshop Photos (Masonry Grid) ───────────────────────────
        workshopPhotos: singleton({
            label: 'Workshop Photos',
            path: 'src/content/workshop-photos',
            format: { data: 'json' },
            schema: {
                photos: fields.array(
                    fields.image({
                        label: 'Photo',
                        directory: 'src/assets/images/site/workshop',
                        publicPath: '../../assets/images/site/workshop/',
                    }),
                    {
                        label: 'Workshop Photos',
                        description: 'These appear in the masonry grid on the Gallery page.',
                        itemLabel: (props) => {
                            const val = props.value;
                            if (val && typeof val === 'object' && 'filename' in val) {
                                return (val as { filename: string }).filename;
                            }
                            return 'Photo';
                        },
                    },
                ),
            },
        }),
    },
});
