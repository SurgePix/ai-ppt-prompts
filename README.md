# AI PPT Prompts

A curated library of 100+ AI prompts for generating PowerPoint slides and presentations, each with a real slide preview, use-case/style filters, and copy-ready text.

Built with Next.js 15 (App Router), React 19, Tailwind CSS 4, and Ant Design.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Project structure

- `src/app` — routes (`/awesome-ppt-prompts`, localized `/[locale]/awesome-ppt-prompts`)
- `src/features/ppt-prompts` — page components, copy, and data-loading logic
- `src/features/resources` — shared resource-page/locale/SEO helpers
- `src/data` — prompt datasets and per-locale translations
- `public/ppt-prompts` — slide preview assets

Part of the [SurgePix](https://surgepix.ai) family of AI creative tools.
