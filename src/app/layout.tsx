import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI PPT Prompt Library",
    template: "%s | AI PPT Prompt Library",
  },
  description:
    "Browse 100+ curated AI prompts for PowerPoint and presentations, each with a real slide preview, use-case and visual-style filters, and copy-ready text.",
  keywords: [
    "AI",
    "PPT",
    "PowerPoint",
    "Prompt",
    "Presentation",
    "Slides",
    "Prompt Library",
  ],
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://db.onlinewebfonts.com/c/cbb3cb559d2e4387e139cfb1656e31f5?family=Arsenica+Trial+Light"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W282GKJBV4"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W282GKJBV4');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
