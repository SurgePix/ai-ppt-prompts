'use client';

import { Navbar } from './navbar';
import { Hero } from './hero';
import { Showcase } from './showcase';
import { QAndA } from './q-and-a';
import { QuoteBanner } from './quote-banner';
import { Footer } from './footer';

export function PptPromptsPageLayout() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Showcase />
      <QAndA />
      <QuoteBanner />
      <Footer />
    </div>
  );
}
