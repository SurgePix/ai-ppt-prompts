import { notFound } from 'next/navigation';
import {
  getAllOwnUrlResourceLocales,
  isSupportedOwnUrlResourceLocale,
} from '@/features/resources/lib/resource-pages';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllOwnUrlResourceLocales().map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isSupportedOwnUrlResourceLocale(locale)) {
    notFound();
  }

  return children;
}