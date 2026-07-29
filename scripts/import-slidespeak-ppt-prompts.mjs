import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.resolve(process.argv[2] ?? '');
const projectRoot = path.resolve(import.meta.dirname, '..');
const promptRoot = path.join(sourceRoot, 'prompts');
const outputPath = path.join(projectRoot, 'src/data/ppt-prompts-slidespeak.json');
const assetRoot = path.join(projectRoot, 'public/ppt-prompts/slidespeak');

if (!process.argv[2]) {
  throw new Error('Usage: node scripts/import-slidespeak-ppt-prompts.mjs <presentation-design-prompts checkout>');
}

const license = await readFile(path.join(sourceRoot, 'LICENSE'), 'utf8');
if (!license.includes('MIT License') || !license.includes('Copyright (c) 2026 SlideSpeak')) {
  throw new Error('The source checkout does not contain the expected SlideSpeak MIT license.');
}

const categoryMap = new Map([
  ['Pitch decks', 'Business Pitch'],
  ['Business & strategy', 'Business / Strategy'],
  ['Consulting', 'Business / Strategy'],
  ['Marketing & brand', 'Marketing'],
  ['Tech & product', 'Tech / Product'],
  ['Creative & portfolio', 'Creative / Design'],
  ['Education & research', 'Education'],
  ['Events & seasonal', 'Events'],
  ['Finance', 'Finance'],
]);

const naturalFileOrder = new Intl.Collator('en', { numeric: true }).compare;
const slugs = (await readdir(promptRoot, { withFileTypes: true }))
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort();

const prompts = [];
for (const [index, slug] of slugs.entries()) {
  const directory = path.join(promptRoot, slug);
  const readme = await readFile(path.join(directory, 'README.md'), 'utf8');
  const prompt = (await readFile(path.join(directory, 'PROMPT.md'), 'utf8')).trim();
  const title = readme.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const description = readme.match(/^>\s+(.+)$/m)?.[1]?.trim();
  const metadata = readme.match(
    /^\*\*Category:\*\*\s*(.+?)\s*&nbsp;·&nbsp;\s*\*\*Style:\*\*\s*(.+?)\s*&nbsp;·&nbsp;\s*\*\*Mode:\*\*\s*(.+?)\s*&nbsp;·&nbsp;\s*\*\*Fonts:\*\*\s*(.+)$/m,
  );

  if (!title || !description || !metadata) {
    throw new Error(`Could not parse SlideSpeak metadata for ${slug}.`);
  }

  const [, sourceCategory, styleText, mode, fonts] = metadata;
  const useCase = categoryMap.get(sourceCategory.trim()) ?? sourceCategory.trim();
  const styles = styleText.split(',').map(value => value.trim()).filter(Boolean);
  const previewDirectory = path.join(directory, 'previews');
  const previewFiles = (await readdir(previewDirectory))
    .filter(fileName => fileName.endsWith('.webp'))
    .sort(naturalFileOrder);
  const targetDirectory = path.join(assetRoot, slug);
  await mkdir(targetDirectory, { recursive: true });

  for (const fileName of previewFiles) {
    await copyFile(path.join(previewDirectory, fileName), path.join(targetDirectory, fileName));
  }

  prompts.push({
    id: 1001 + index,
    title,
    description,
    prompt,
    author: 'SlideSpeak',
    sourceUrl: `https://github.com/SlideSpeak/presentation-design-prompts/tree/main/prompts/${slug}`,
    sourcePlatform: 'github',
    category: useCase,
    style: styles[0] ?? mode.trim(),
    useCases: [useCase],
    styles,
    tags: [
      `use_case:${useCase}`,
      ...styles.map(style => `style:${style}`),
    ],
    images: previewFiles.map(fileName => `/ppt-prompts/slidespeak/${slug}/${fileName}`),
    metadata: {
      sourceCategory: sourceCategory.trim(),
      mode: mode.trim(),
      fonts: fonts.trim(),
      license: 'MIT',
    },
  });
}

await mkdir(path.dirname(outputPath), { recursive: true });
await mkdir(assetRoot, { recursive: true });
await copyFile(path.join(sourceRoot, 'LICENSE'), path.join(assetRoot, 'LICENSE.txt'));
await writeFile(outputPath, `${JSON.stringify(prompts, null, 2)}\n`, 'utf8');

process.stdout.write(`Imported ${prompts.length} SlideSpeak PPT prompts into ${outputPath}\n`);
