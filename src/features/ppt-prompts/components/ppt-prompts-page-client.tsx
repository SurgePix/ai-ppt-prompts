'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import PptPromptsPageDigitalArchive from './ppt-prompts-page-digital-archive';
import { getPptPromptsPageData } from '@/features/ppt-prompts/lib/ppt-prompts-locales';
import type { PptPromptPageLocale } from '@/features/ppt-prompts/lib/ppt-prompts-routing';
import type { PptPromptsPageData } from '@/features/ppt-prompts/lib/ppt-prompts-types';

const fallbackCopyByLocale: Record<PptPromptPageLocale, {
  loadingTitle: string;
  loadingSubtitle: string;
  errorTitle: string;
  retry: string;
  loadError: string;
}> = {
  en: {
    loadingTitle: 'Loading PPT prompt library...',
    loadingSubtitle: 'Preparing localized prompt content on the client.',
    errorTitle: 'Failed to load PPT prompts',
    retry: 'Try again',
    loadError: 'Failed to load prompts.',
  },
  zh: {
    loadingTitle: '正在加载 PPT 提示词库...',
    loadingSubtitle: '正在准备本地化提示词内容。',
    errorTitle: 'PPT 提示词加载失败',
    retry: '重试',
    loadError: '提示词加载失败。',
  },
  'zh-Hant': {
    loadingTitle: '正在載入 PPT 提示詞庫...',
    loadingSubtitle: '正在準備本地化提示詞內容。',
    errorTitle: 'PPT 提示詞載入失敗',
    retry: '重試',
    loadError: '提示詞載入失敗。',
  },
  ja: {
    loadingTitle: 'PPTプロンプトライブラリを読み込み中...',
    loadingSubtitle: 'ローカライズされたプロンプト内容を準備しています。',
    errorTitle: 'PPTプロンプトの読み込みに失敗しました',
    retry: '再試行',
    loadError: 'プロンプトの読み込みに失敗しました。',
  },
  ko: {
    loadingTitle: 'PPT 프롬프트 라이브러리를 불러오는 중...',
    loadingSubtitle: '현지화된 프롬프트 콘텐츠를 준비하는 중입니다.',
    errorTitle: 'PPT 프롬프트를 불러오지 못했습니다',
    retry: '다시 시도',
    loadError: '프롬프트를 불러오지 못했습니다.',
  },
  es: {
    loadingTitle: 'Cargando biblioteca de prompts PPT...',
    loadingSubtitle: 'Preparando contenido localizado de prompts.',
    errorTitle: 'No se pudieron cargar los prompts PPT',
    retry: 'Intentar de nuevo',
    loadError: 'No se pudieron cargar los prompts.',
  },
  fr: {
    loadingTitle: 'Chargement de la bibliothèque de prompts PPT...',
    loadingSubtitle: 'Préparation du contenu localisé des prompts.',
    errorTitle: 'Échec du chargement des prompts PPT',
    retry: 'Réessayer',
    loadError: 'Échec du chargement des prompts.',
  },
  de: {
    loadingTitle: 'PPT-Prompt-Bibliothek wird geladen...',
    loadingSubtitle: 'Lokalisierte Prompt-Inhalte werden vorbereitet.',
    errorTitle: 'PPT-Prompts konnten nicht geladen werden',
    retry: 'Erneut versuchen',
    loadError: 'Prompts konnten nicht geladen werden.',
  },
  pl: {
    loadingTitle: 'Ładowanie biblioteki promptów PPT...',
    loadingSubtitle: 'Przygotowywanie zlokalizowanej treści promptów.',
    errorTitle: 'Nie udało się załadować promptów PPT',
    retry: 'Spróbuj ponownie',
    loadError: 'Nie udało się załadować promptów.',
  },
  tr: {
    loadingTitle: 'PPT prompt kitaplığı yükleniyor...',
    loadingSubtitle: 'Yerelleştirilmiş prompt içeriği hazırlanıyor.',
    errorTitle: 'PPT promptları yüklenemedi',
    retry: 'Tekrar dene',
    loadError: 'Promptlar yüklenemedi.',
  },
  vi: {
    loadingTitle: 'Đang tải thư viện prompt PPT...',
    loadingSubtitle: 'Đang chuẩn bị nội dung prompt đã bản địa hóa.',
    errorTitle: 'Không tải được prompt PPT',
    retry: 'Thử lại',
    loadError: 'Không tải được prompt.',
  },
  id: {
    loadingTitle: 'Memuat pustaka prompt PPT...',
    loadingSubtitle: 'Menyiapkan konten prompt yang dilokalkan.',
    errorTitle: 'Gagal memuat prompt PPT',
    retry: 'Coba lagi',
    loadError: 'Gagal memuat prompt.',
  },
  th: {
    loadingTitle: 'กำลังโหลดคลังพรอมต์ PPT...',
    loadingSubtitle: 'กำลังเตรียมเนื้อหาพรอมต์ที่แปลแล้ว',
    errorTitle: 'โหลดพรอมต์ PPT ไม่สำเร็จ',
    retry: 'ลองอีกครั้ง',
    loadError: 'โหลดพรอมต์ไม่สำเร็จ',
  },
};

export default function PptPromptsPageClient({
  locale,
  pagePath,
}: {
  locale: PptPromptPageLocale;
  pagePath: string;
}) {
  const [data, setData] = useState<PptPromptsPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const fallbackCopy = fallbackCopyByLocale[locale] ?? fallbackCopyByLocale.en;

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        const nextData = await getPptPromptsPageData(locale);

        if (cancelled) {
          return;
        }

        setData(nextData);
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : fallbackCopy.loadError);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [locale, reloadKey]);

  if (isLoading && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center bg-black">
        <div>
          <p className="text-lg font-semibold text-white">{fallbackCopy.loadingTitle}</p>
          <p className="mt-2 text-sm text-white/60">{fallbackCopy.loadingSubtitle}</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center bg-black">
        <div className="max-w-md">
          <p className="text-lg font-semibold text-white">{fallbackCopy.errorTitle}</p>
          <p className="mt-2 text-sm text-white/60">{error}</p>
          <Button className="mt-4" onClick={() => setReloadKey(value => value + 1)}>
            {fallbackCopy.retry}
          </Button>
        </div>
      </div>
    );
  }

  return data ? <PptPromptsPageDigitalArchive data={data} pagePath={pagePath} /> : null;
}
