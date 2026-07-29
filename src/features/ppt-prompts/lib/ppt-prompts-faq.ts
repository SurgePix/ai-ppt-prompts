export type PptPromptFaqItem = {
  column: 0 | 1;
  q: string;
  a: string;
};

export const PPT_PROMPT_FAQ: PptPromptFaqItem[] = [
  {
    column: 0,
    q: 'What is an AI PPT prompt?',
    a: 'An AI PPT prompt is a ready-made text instruction that tells an AI presentation tool exactly what slides to build — the topic, structure, tone and visual style. Instead of starting from a blank deck, you paste a prompt and get a professional, editable presentation in seconds.',
  },
  {
    column: 0,
    q: 'How do I use these prompts to make a presentation?',
    a: 'Pick a prompt that matches your use case, copy it, then open SurgePix and choose the Presentation tool. Paste the prompt, adjust the topic to your needs, and generate. You can keep refining the wording to control layout, length and design.',
  },
  {
    column: 0,
    q: 'Are these PPT prompts free to use?',
    a: 'Yes. Every prompt in the library is free to copy and reuse. They are curated from high-quality creator communities and updated regularly, so you can always find fresh, presentation-ready ideas at no cost.',
  },
  {
    column: 1,
    q: 'Which AI tools work with these prompts?',
    a: 'The prompts are written to work with SurgePix and most modern AI presentation and slide generators. Because they are plain text, you can also adapt them for tools like ChatGPT, Gemini or Gamma to draft outlines and speaker notes.',
  },
  {
    column: 1,
    q: 'Can I filter by use case and visual style?',
    a: 'Absolutely. Use the Use Cases and Styles filters to narrow the library to exactly what you need — pitch decks, reports, education, marketing and more — each paired with a real slide preview so you know what you are getting before you generate.',
  },
  {
    column: 1,
    q: 'How often is the prompt library updated?',
    a: 'We add new prompts on a rolling basis, sourcing the best ideas from Reddit, X, GitHub and the SurgePix community. Bookmark the page or join our Discord to catch every update as the collection grows.',
  },
];
