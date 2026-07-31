# Contributing

Thanks for wanting to add a prompt or improve the library.

## Submit a prompt

**Option A — Open an issue (no code required)**

[Open a new issue](https://github.com/SurgePix/ai-ppt-prompts/issues/new) with:

- The prompt text
- A generated slide image, if you have one
- Where it came from — a **direct link to the original post**, plus the author's handle. If it's your own, say so.
- Suggested use case (e.g. `Business Pitch`, `Marketing`, `Education`) and style (e.g. `Minimal`, `Dark`, `Corporate`)

**Option B — Open a pull request**

Add an entry to [`data/ppt-prompts-registry.json`](../data/ppt-prompts-registry.json):

```json
{
  "id": "registry:your-unique-id",
  "title": "Your Prompt Title",
  "prompt": "The full prompt text...",
  "author": "your-handle",
  "sourceUrl": "https://link-to-the-exact-post-or-file",
  "sourcePlatform": "github",
  "category": "Business Pitch",
  "style": "Minimal",
  "useCases": ["Business Pitch"],
  "styles": ["Minimal"],
  "tags": ["use_case:Business Pitch", "style:Minimal"],
  "images": ["https://..."]
}
```

Then regenerate the READMEs:

```bash
npm run generate
```

### Rules for `sourceUrl`

Link to the **exact** post, file, or directory the prompt came from — not a site
homepage, not a subreddit root. `https://x.com/` or `https://reddit.com/r/foo/`
is not a citation and will be rejected. If you can't produce a verifiable link,
say so in the PR and leave the field out; an entry with no claimed source is far
better than one with a wrong one.

Some existing entries in `data/ppt-prompts.json` are marked
`"provenance": "unverified"` for exactly this reason.

### Taxonomy

Valid use cases and styles are whatever already appears across `data/`.
`category`/`style` must match the first entry of `useCases`/`styles`, and `tags`
must mirror them as `use_case:*` / `style:*`.

## Repository layout

| Path | What it is |
|---|---|
| `data/*.json` | The prompt library |
| `data/locales/*.json` | UI strings and per-prompt translations for 12 languages |
| `data/licenses/` | Upstream licences that must travel with the content |
| `scripts/generate-readme.mjs` | Regenerates all 13 READMEs from `data/` |
| `public/images/` | Screenshots used in the READMEs |

READMEs are generated — edit `data/` or the script, never the READMEs directly.

## Reporting an issue

Use [GitHub Issues](https://github.com/SurgePix/ai-ppt-prompts/issues) for broken
previews, wrong attribution, or content you believe shouldn't be here.
