# Contributing

Thanks for wanting to add a prompt or improve the gallery!

## Submit a prompt

**Option A — Open an issue (no code required)**

[Open a new issue](https://github.com/SurgePix/ai-ppt-prompts/issues/new) with:

- The prompt text
- A generated slide/preview image (if you have one)
- Source link and author/handle, if it isn't your own
- Suggested use case (e.g. `Business Pitch`, `Marketing`, `Education`) and style (e.g. `Minimal`, `Dark`, `Corporate`)

**Option B — Open a PR**

Add an entry to [`src/data/ppt-prompts-registry.json`](../src/data/ppt-prompts-registry.json):

```json
{
  "id": "registry:your-unique-id",
  "title": "Your Prompt Title",
  "prompt": "The full prompt text...",
  "author": "your-handle",
  "sourceUrl": "https://...",
  "sourcePlatform": "github",
  "category": "Business Pitch",
  "style": "Minimal",
  "useCases": ["Business Pitch"],
  "styles": ["Minimal"],
  "tags": ["use_case:Business Pitch", "style:Minimal"],
  "images": ["https://..."]
}
```

Valid use cases and styles are defined in [`src/features/ppt-prompts/lib/ppt-prompts-types.ts`](../src/features/ppt-prompts/lib/ppt-prompts-types.ts) (`PRESENTATION_USE_CASES`, `PRESENTATION_STYLES`). `category`/`style` must be the first entry of `useCases`/`styles`, and `tags` must mirror them as `use_case:*`/`style:*` — this is enforced by a schema check in `ppt-prompts-locales.ts` at build time.

## Code changes

- Run `npm run check` (TypeScript) and `npm run build` before opening a PR.
- Keep changes scoped to what you're fixing/adding — see the project layout in the main [README](../README.md#-whats-in-this-repo).

## Reporting an issue

Use [GitHub Issues](https://github.com/SurgePix/ai-ppt-prompts/issues) for bugs, broken previews, or content you believe shouldn't be here.
