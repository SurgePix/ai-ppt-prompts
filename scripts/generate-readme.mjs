/**
 * Regenerates README.md and every README_<locale>.md from data/.
 *
 * The prompt library is inlined in full rather than linked, so GitHub and search
 * engines can index the actual content. Run after changing anything under data/:
 *
 *   node scripts/generate-readme.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));

const GALLERY = 'https://surgepix.ai/resources/awesome-ppt-prompts';
const REPO = 'https://github.com/SurgePix/ai-ppt-prompts';

const LOCALES = [
  { code: 'en', file: 'README.md', label: 'English' },
  { code: 'zh', file: 'README_zh.md', label: '简体中文' },
  { code: 'zh-Hant', file: 'README_zh-Hant.md', label: '繁體中文' },
  { code: 'ja', file: 'README_ja.md', label: '日本語' },
  { code: 'ko', file: 'README_ko.md', label: '한국어' },
  { code: 'th', file: 'README_th.md', label: 'ไทย' },
  { code: 'id', file: 'README_id.md', label: 'Bahasa Indonesia' },
  { code: 'vi', file: 'README_vi.md', label: 'Tiếng Việt' },
  { code: 'de', file: 'README_de.md', label: 'Deutsch' },
  { code: 'fr', file: 'README_fr.md', label: 'Français' },
  { code: 'es', file: 'README_es.md', label: 'Español' },
  { code: 'tr', file: 'README_tr.md', label: 'Türkçe' },
  { code: 'pl', file: 'README_pl.md', label: 'Polski' },
];

/** Section headings and boilerplate. English is the fallback for any gap. */
const UI = {
  en: {
    tagline: 'A curated collection of AI prompts for generating PowerPoint slides and presentations — each with a real slide preview, use-case and style filters, and copy-ready text.',
    notice: '**Copyright notice**: prompts are collected from the community for educational and inspirational purposes, with source attribution on every entry. If you believe any content infringes on your rights, please [open an issue](' + REPO + '/issues/new) and we will remove it promptly.',
    galleryCta: 'Browse the interactive gallery',
    gallerySub: 'Search across every prompt, filter by use case and visual style, and copy any of them in one click:',
    contents: 'Contents', categories: 'Categories', stats: 'Statistics',
    allPrompts: 'All Prompts', contributing: 'How to Contribute', license: 'License',
    ack: 'Acknowledgements', starHistory: 'Star History',
    useCases: 'Use Cases', styles: 'Styles', total: 'Total prompts', locales: 'Languages',
    useCase: 'Use case', style: 'Style', source: 'Source', showPrompt: 'Show prompt',
    contributeBody: 'Found a great AI PPT prompt? See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) — submit it as an issue, or add it to `data/` via pull request.',
    licenseBody: '- Repository content is licensed under [MIT](LICENSE).\n- Prompts are collected from the community with source attribution; see the notice above.',
  },
  zh: {
    tagline: '精选 AI PPT 提示词库 —— 每条都配有真实幻灯片预览、用途与风格筛选，以及可直接复制的文本。',
    notice: '**版权声明**：提示词收集自社区，仅用于学习与灵感参考，每条均标注来源。如认为任何内容侵犯了你的权益，请[提交 issue](' + REPO + '/issues/new)，我们会及时处理。',
    galleryCta: '打开在线画廊', gallerySub: '全库搜索、按用途和视觉风格筛选，一键复制任意提示词：',
    contents: '目录', categories: '分类', stats: '数据概览', allPrompts: '全部提示词',
    contributing: '如何贡献', license: '许可', ack: '致谢', starHistory: 'Star 趋势',
    useCases: '使用场景', styles: '视觉风格', total: '提示词总数', locales: '支持语言',
    useCase: '使用场景', style: '风格', source: '来源', showPrompt: '查看提示词',
    contributeBody: '有好的 AI PPT 提示词？请看 [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) —— 可以提交 issue，也可以直接向 `data/` 提 PR。',
    licenseBody: '- 仓库内容采用 [MIT](LICENSE) 许可。\n- 提示词收集自社区并标注来源，详见上方版权声明。',
  },
  'zh-Hant': {
    tagline: '精選 AI PPT 提示詞庫 —— 每條都配有真實簡報預覽、用途與風格篩選，以及可直接複製的文字。',
    notice: '**版權聲明**：提示詞收集自社群，僅用於學習與靈感參考，每條均標註來源。如認為任何內容侵犯了你的權益，請[提交 issue](' + REPO + '/issues/new)，我們會及時處理。',
    galleryCta: '開啟線上藝廊', gallerySub: '全庫搜尋、依用途與視覺風格篩選，一鍵複製任意提示詞：',
    contents: '目錄', categories: '分類', stats: '數據概覽', allPrompts: '全部提示詞',
    contributing: '如何貢獻', license: '授權', ack: '致謝', starHistory: 'Star 趨勢',
    useCases: '使用場景', styles: '視覺風格', total: '提示詞總數', locales: '支援語言',
    useCase: '使用場景', style: '風格', source: '來源', showPrompt: '查看提示詞',
    contributeBody: '有好的 AI PPT 提示詞？請看 [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) —— 可以提交 issue，也可以直接向 `data/` 提 PR。',
    licenseBody: '- 儲存庫內容採用 [MIT](LICENSE) 授權。\n- 提示詞收集自社群並標註來源，詳見上方版權聲明。',
  },
  ja: {
    tagline: 'PowerPoint・プレゼン資料を生成するための厳選 AI プロンプト集 —— 各プロンプトに実際のスライドプレビュー、用途・スタイル絞り込み、コピーしてすぐ使えるテキストが付属。',
    notice: '**著作権について**：プロンプトはコミュニティから出典を明記して収集したもので、学習・参考目的です。権利侵害があるとお考えの場合は [issue](' + REPO + '/issues/new) を開いてください。速やかに対応します。',
    galleryCta: 'ギャラリーを開く', gallerySub: '全プロンプトを検索し、ユースケースとスタイルで絞り込み、ワンクリックでコピー：',
    contents: '目次', categories: 'カテゴリ', stats: '統計', allPrompts: 'すべてのプロンプト',
    contributing: '貢献方法', license: 'ライセンス', ack: '謝辞', starHistory: 'Star 推移',
    useCases: 'ユースケース', styles: 'スタイル', total: 'プロンプト総数', locales: '対応言語',
    useCase: 'ユースケース', style: 'スタイル', source: '出典', showPrompt: 'プロンプトを表示',
    contributeBody: '良い AI PPT プロンプトをお持ちですか？[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) をご覧ください —— issue でも、`data/` への PR でも受け付けています。',
    licenseBody: '- リポジトリの内容は [MIT](LICENSE) ライセンスです。\n- プロンプトは出典を明記してコミュニティから収集しています。上記の注意書きをご確認ください。',
  },
  ko: {
    tagline: 'PowerPoint 및 프레젠테이션 생성을 위한 엄선된 AI 프롬프트 모음 —— 각 항목에 실제 슬라이드 미리보기, 활용 사례·스타일 필터, 바로 복사할 수 있는 텍스트가 포함되어 있습니다.',
    notice: '**저작권 안내**: 프롬프트는 커뮤니티에서 출처를 명시하여 수집했으며 학습 및 참고 목적입니다. 권리 침해라고 판단되면 [issue](' + REPO + '/issues/new)를 열어주세요. 신속히 조치하겠습니다.',
    galleryCta: '갤러리 열기', gallerySub: '전체 프롬프트 검색, 활용 사례·스타일 필터링, 원클릭 복사:',
    contents: '목차', categories: '카테고리', stats: '통계', allPrompts: '전체 프롬프트',
    contributing: '기여 방법', license: '라이선스', ack: '감사의 말', starHistory: 'Star 추이',
    useCases: '활용 사례', styles: '스타일', total: '전체 프롬프트', locales: '지원 언어',
    useCase: '활용 사례', style: '스타일', source: '출처', showPrompt: '프롬프트 보기',
    contributeBody: '좋은 AI PPT 프롬프트가 있나요? [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)를 참고하세요 —— issue 또는 `data/` PR 모두 환영합니다.',
    licenseBody: '- 저장소 콘텐츠는 [MIT](LICENSE) 라이선스를 따릅니다.\n- 프롬프트는 출처를 명시하여 커뮤니티에서 수집했습니다. 위 안내를 참고하세요.',
  },
  th: {
    tagline: 'คลังพรอมต์ AI คัดสรรสำหรับสร้างสไลด์ PowerPoint และงานนำเสนอ —— แต่ละรายการมีตัวอย่างสไลด์จริง ตัวกรองตามการใช้งานและสไตล์ พร้อมข้อความที่คัดลอกไปใช้ได้ทันที',
    notice: '**ประกาศลิขสิทธิ์**: พรอมต์รวบรวมจากชุมชนเพื่อการศึกษาและอ้างอิง พร้อมระบุแหล่งที่มาทุกรายการ หากคุณเชื่อว่ามีเนื้อหาใดละเมิดสิทธิ์ โปรด[เปิด issue](' + REPO + '/issues/new) เราจะดำเนินการโดยเร็ว',
    galleryCta: 'เปิดคลังออนไลน์', gallerySub: 'ค้นหาทั้งคลัง กรองตามการใช้งานและสไตล์ และคัดลอกได้ในคลิกเดียว:',
    contents: 'สารบัญ', categories: 'หมวดหมู่', stats: 'สถิติ', allPrompts: 'พรอมต์ทั้งหมด',
    contributing: 'ร่วมสนับสนุน', license: 'สัญญาอนุญาต', ack: 'กิตติกรรมประกาศ', starHistory: 'แนวโน้ม Star',
    useCases: 'กรณีการใช้งาน', styles: 'สไตล์', total: 'จำนวนพรอมต์', locales: 'ภาษาที่รองรับ',
    useCase: 'การใช้งาน', style: 'สไตล์', source: 'แหล่งที่มา', showPrompt: 'ดูพรอมต์',
    contributeBody: 'มีพรอมต์ PPT ดี ๆ ไหม? ดูที่ [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) —— ส่งเป็น issue หรือ PR ไปที่ `data/` ก็ได้',
    licenseBody: '- เนื้อหาในที่เก็บนี้อยู่ภายใต้สัญญาอนุญาต [MIT](LICENSE)\n- พรอมต์รวบรวมจากชุมชนพร้อมระบุแหล่งที่มา ดูประกาศด้านบน',
  },
  id: {
    tagline: 'Koleksi prompt AI terkurasi untuk membuat slide PowerPoint dan presentasi —— setiap entri disertai pratinjau slide asli, filter kasus penggunaan dan gaya, serta teks siap salin.',
    notice: '**Pemberitahuan hak cipta**: prompt dikumpulkan dari komunitas untuk tujuan edukasi dan inspirasi, dengan atribusi sumber pada setiap entri. Jika Anda merasa ada konten yang melanggar hak Anda, silakan [buka issue](' + REPO + '/issues/new) dan kami akan segera menghapusnya.',
    galleryCta: 'Buka galeri online', gallerySub: 'Cari seluruh koleksi, filter berdasarkan kasus penggunaan dan gaya visual, salin dengan satu klik:',
    contents: 'Daftar Isi', categories: 'Kategori', stats: 'Statistik', allPrompts: 'Semua Prompt',
    contributing: 'Cara Berkontribusi', license: 'Lisensi', ack: 'Ucapan Terima Kasih', starHistory: 'Riwayat Star',
    useCases: 'Kasus Penggunaan', styles: 'Gaya', total: 'Total prompt', locales: 'Bahasa',
    useCase: 'Kasus penggunaan', style: 'Gaya', source: 'Sumber', showPrompt: 'Lihat prompt',
    contributeBody: 'Punya prompt PPT AI yang bagus? Lihat [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) —— kirim sebagai issue, atau tambahkan ke `data/` lewat pull request.',
    licenseBody: '- Konten repositori dilisensikan di bawah [MIT](LICENSE).\n- Prompt dikumpulkan dari komunitas dengan atribusi sumber; lihat pemberitahuan di atas.',
  },
  vi: {
    tagline: 'Bộ sưu tập prompt AI được tuyển chọn để tạo slide PowerPoint và bài thuyết trình —— mỗi mục đều có ảnh xem trước slide thật, bộ lọc theo mục đích và phong cách, cùng văn bản sao chép là dùng được ngay.',
    notice: '**Thông báo bản quyền**: các prompt được thu thập từ cộng đồng cho mục đích giáo dục và tham khảo, có ghi rõ nguồn cho từng mục. Nếu bạn cho rằng nội dung nào vi phạm quyền của mình, vui lòng [mở issue](' + REPO + '/issues/new), chúng tôi sẽ xử lý kịp thời.',
    galleryCta: 'Mở thư viện trực tuyến', gallerySub: 'Tìm kiếm toàn bộ, lọc theo mục đích và phong cách, sao chép chỉ với một cú nhấp:',
    contents: 'Mục lục', categories: 'Danh mục', stats: 'Thống kê', allPrompts: 'Tất cả prompt',
    contributing: 'Cách đóng góp', license: 'Giấy phép', ack: 'Lời cảm ơn', starHistory: 'Lịch sử Star',
    useCases: 'Trường hợp sử dụng', styles: 'Phong cách', total: 'Tổng số prompt', locales: 'Ngôn ngữ',
    useCase: 'Mục đích', style: 'Phong cách', source: 'Nguồn', showPrompt: 'Xem prompt',
    contributeBody: 'Bạn có prompt PPT AI hay? Xem [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) —— gửi qua issue, hoặc thêm vào `data/` bằng pull request.',
    licenseBody: '- Nội dung kho lưu trữ được cấp phép theo [MIT](LICENSE).\n- Prompt được thu thập từ cộng đồng có ghi nguồn; xem thông báo ở trên.',
  },
  de: {
    tagline: 'Kuratierte Sammlung von KI-Prompts für PowerPoint-Folien und Präsentationen —— jeder Eintrag mit echter Folienvorschau, Filtern nach Anwendungsfall und Stil sowie kopierfertigem Text.',
    notice: '**Urheberrechtshinweis**: Die Prompts wurden mit Quellenangabe aus der Community gesammelt und dienen Bildungs- und Inspirationszwecken. Wenn Sie glauben, dass Inhalte Ihre Rechte verletzen, [eröffnen Sie bitte ein Issue](' + REPO + '/issues/new) — wir entfernen es umgehend.',
    galleryCta: 'Zur Online-Galerie', gallerySub: 'Alle Prompts durchsuchen, nach Anwendungsfall und Stil filtern und mit einem Klick kopieren:',
    contents: 'Inhalt', categories: 'Kategorien', stats: 'Statistik', allPrompts: 'Alle Prompts',
    contributing: 'Mitwirken', license: 'Lizenz', ack: 'Danksagung', starHistory: 'Star-Verlauf',
    useCases: 'Anwendungsfälle', styles: 'Stile', total: 'Prompts insgesamt', locales: 'Sprachen',
    useCase: 'Anwendungsfall', style: 'Stil', source: 'Quelle', showPrompt: 'Prompt anzeigen',
    contributeBody: 'Sie haben einen guten KI-PPT-Prompt? Siehe [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) —— als Issue einreichen oder per Pull Request zu `data/` hinzufügen.',
    licenseBody: '- Die Inhalte des Repositories stehen unter der [MIT](LICENSE)-Lizenz.\n- Prompts stammen mit Quellenangabe aus der Community; siehe Hinweis oben.',
  },
  fr: {
    tagline: 'Collection sélectionnée de prompts IA pour créer des diapositives PowerPoint et des présentations —— chaque entrée avec un aperçu de diapositive réel, des filtres par cas d’usage et style, et un texte prêt à copier.',
    notice: '**Avis de droit d’auteur** : les prompts sont collectés auprès de la communauté à des fins éducatives et d’inspiration, avec attribution de la source pour chaque entrée. Si vous pensez qu’un contenu porte atteinte à vos droits, veuillez [ouvrir une issue](' + REPO + '/issues/new) ; nous le retirerons rapidement.',
    galleryCta: 'Ouvrir la galerie en ligne', gallerySub: 'Rechercher dans toute la bibliothèque, filtrer par cas d’usage et style visuel, copier en un clic :',
    contents: 'Sommaire', categories: 'Catégories', stats: 'Statistiques', allPrompts: 'Tous les prompts',
    contributing: 'Contribuer', license: 'Licence', ack: 'Remerciements', starHistory: 'Historique des stars',
    useCases: 'Cas d’usage', styles: 'Styles', total: 'Nombre de prompts', locales: 'Langues',
    useCase: 'Cas d’usage', style: 'Style', source: 'Source', showPrompt: 'Afficher le prompt',
    contributeBody: 'Vous avez un bon prompt PPT IA ? Voir [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) —— soumettez-le en issue, ou ajoutez-le à `data/` via une pull request.',
    licenseBody: '- Le contenu du dépôt est sous licence [MIT](LICENSE).\n- Les prompts proviennent de la communauté avec attribution ; voir l’avis ci-dessus.',
  },
  es: {
    tagline: 'Colección seleccionada de prompts de IA para generar diapositivas de PowerPoint y presentaciones —— cada entrada con una vista previa real, filtros por caso de uso y estilo, y texto listo para copiar.',
    notice: '**Aviso de derechos de autor**: los prompts se recopilan de la comunidad con fines educativos e inspiradores, con atribución de la fuente en cada entrada. Si cree que algún contenido infringe sus derechos, [abra un issue](' + REPO + '/issues/new) y lo eliminaremos de inmediato.',
    galleryCta: 'Abrir la galería en línea', gallerySub: 'Busca en toda la biblioteca, filtra por caso de uso y estilo visual, y copia con un solo clic:',
    contents: 'Contenido', categories: 'Categorías', stats: 'Estadísticas', allPrompts: 'Todos los prompts',
    contributing: 'Cómo contribuir', license: 'Licencia', ack: 'Agradecimientos', starHistory: 'Historial de stars',
    useCases: 'Casos de uso', styles: 'Estilos', total: 'Prompts en total', locales: 'Idiomas',
    useCase: 'Caso de uso', style: 'Estilo', source: 'Fuente', showPrompt: 'Ver prompt',
    contributeBody: '¿Tienes un buen prompt de PPT con IA? Consulta [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) —— envíalo como issue o añádelo a `data/` mediante un pull request.',
    licenseBody: '- El contenido del repositorio está bajo licencia [MIT](LICENSE).\n- Los prompts se recopilan de la comunidad con atribución; consulta el aviso anterior.',
  },
  tr: {
    tagline: 'PowerPoint slaytları ve sunumlar üretmek için derlenmiş yapay zeka prompt koleksiyonu —— her kayıtta gerçek slayt önizlemesi, kullanım alanı ve stil filtreleri, kopyalanmaya hazır metin.',
    notice: '**Telif hakkı bildirimi**: promptlar eğitim ve ilham amacıyla, her kayıtta kaynak belirtilerek topluluktan derlenmiştir. Herhangi bir içeriğin haklarınızı ihlal ettiğini düşünüyorsanız lütfen [bir issue açın](' + REPO + '/issues/new); hızlıca kaldıracağız.',
    galleryCta: 'Çevrimiçi galeriyi aç', gallerySub: 'Tüm koleksiyonda arama yapın, kullanım alanı ve görsel stile göre filtreleyin, tek tıkla kopyalayın:',
    contents: 'İçindekiler', categories: 'Kategoriler', stats: 'İstatistikler', allPrompts: 'Tüm Promptlar',
    contributing: 'Nasıl Katkıda Bulunulur', license: 'Lisans', ack: 'Teşekkürler', starHistory: 'Star Geçmişi',
    useCases: 'Kullanım Alanları', styles: 'Stiller', total: 'Toplam prompt', locales: 'Diller',
    useCase: 'Kullanım alanı', style: 'Stil', source: 'Kaynak', showPrompt: 'Promptu göster',
    contributeBody: 'İyi bir yapay zeka PPT promptunuz mu var? [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) dosyasına bakın —— issue olarak gönderin ya da pull request ile `data/` altına ekleyin.',
    licenseBody: '- Depo içeriği [MIT](LICENSE) lisansı altındadır.\n- Promptlar kaynak belirtilerek topluluktan derlenmiştir; yukarıdaki bildirime bakın.',
  },
  pl: {
    tagline: 'Wyselekcjonowany zbiór promptów AI do tworzenia slajdów PowerPoint i prezentacji —— każdy wpis z prawdziwym podglądem slajdu, filtrami według zastosowania i stylu oraz gotowym do skopiowania tekstem.',
    notice: '**Informacja o prawach autorskich**: prompty zostały zebrane od społeczności w celach edukacyjnych i inspiracyjnych, z podaniem źródła przy każdym wpisie. Jeśli uważasz, że jakaś treść narusza Twoje prawa, [otwórz issue](' + REPO + '/issues/new) — usuniemy ją niezwłocznie.',
    galleryCta: 'Otwórz galerię online', gallerySub: 'Przeszukaj całą bibliotekę, filtruj według zastosowania i stylu wizualnego, kopiuj jednym kliknięciem:',
    contents: 'Spis treści', categories: 'Kategorie', stats: 'Statystyki', allPrompts: 'Wszystkie prompty',
    contributing: 'Jak współtworzyć', license: 'Licencja', ack: 'Podziękowania', starHistory: 'Historia gwiazdek',
    useCases: 'Zastosowania', styles: 'Style', total: 'Liczba promptów', locales: 'Języki',
    useCase: 'Zastosowanie', style: 'Styl', source: 'Źródło', showPrompt: 'Pokaż prompt',
    contributeBody: 'Masz dobry prompt PPT AI? Zobacz [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) —— zgłoś go jako issue lub dodaj do `data/` przez pull request.',
    licenseBody: '- Zawartość repozytorium jest objęta licencją [MIT](LICENSE).\n- Prompty pochodzą od społeczności z podaniem źródła; zobacz informację powyżej.',
  },
};

const prompts = [
  ...readJson('data/ppt-prompts.json'),
  ...readJson('data/ppt-prompts-registry.json'),
  ...readJson('data/ppt-prompts-slidespeak.json'),
];

const translations = Object.fromEntries(
  LOCALES.filter((l) => l.code !== 'en').map((l) => [l.code, readJson(`data/locales/${l.code}.json`)]),
);

const galleryUrl = (code) =>
  code === 'en' ? GALLERY : `https://surgepix.ai/resources/${code}/awesome-ppt-prompts`;

const asset = (kind, code) => {
  const localized = `public/images/${kind}-${code}.jpg`;
  if (fs.existsSync(path.join(root, localized))) return localized;
  // zh-Hant shares the zh captures
  const fallback = `public/images/${kind}-zh.jpg`;
  if (code === 'zh-Hant' && fs.existsSync(path.join(root, fallback))) return fallback;
  return `public/images/${kind}.jpg`;
};

const langRow = (current) =>
  LOCALES.map(({ code, file, label }) => {
    const badge = encodeURIComponent(label);
    const state = code === current ? 'Current-brightgreen' : 'Click%20to%20View-lightgrey';
    return `[![${label}](https://img.shields.io/badge/${badge}-${state})](${file})`;
  }).join(' ');

const englishTitle = (p) => p.title ?? (p.tags || []).find((t) => !t.includes(':')) ?? p.category;

function localize(p, code) {
  if (code === 'en') return { title: englishTitle(p), description: p.description };
  const o = translations[code]?.prompts?.[String(p.id)];
  return { title: o?.title ?? englishTitle(p), description: o?.description ?? p.description };
}

const label = (code, kind, value) => translations[code]?.[kind]?.[value] ?? value;

function render(code) {
  const t = { ...UI.en, ...(UI[code] ?? {}) };
  const useCases = [...new Set(prompts.flatMap((p) => p.useCases ?? []))];
  const styles = [...new Set(prompts.flatMap((p) => p.styles ?? []))];

  const entries = prompts.map((p, i) => {
    const { title, description } = localize(p, code);
    const preview = p.images?.[0];
    const uc = (p.useCases ?? []).map((v) => label(code, 'categories', v)).join(' · ');
    const st = (p.styles ?? []).map((v) => label(code, 'styles', v)).join(' · ');
    const src = p.sourceUrl ? `[${p.author ?? p.sourcePlatform}](${p.sourceUrl})` : (p.author ?? '');
    const meta = [`**${t.useCase}:** ${uc}`, `**${t.style}:** ${st}`];
    if (src) meta.push(`**${t.source}:** ${src}`);
    // Only the slidespeak entries carry a real description; elsewhere the field
    // falls back to the prompt itself, which would just duplicate the code block.
    const blurb = description && description !== p.prompt ? `> ${description}` : null;
    return [
      `### ${i + 1}. ${title}`,
      preview ? `<img src="${preview}" width="640" alt="${title}">` : null,
      blurb,
      meta.join(' · '),
      '```text\n' + p.prompt + '\n```',
    ].filter(Boolean).join('\n\n') + '\n';
  });

  return `${langRow(code)}

# 🎨 Awesome AI PPT Prompts

> ${t.tagline}

<a href="${galleryUrl(code)}">
  <img src="${asset('hero', code)}" alt="AI PPT Prompt Library" width="100%" />
</a>

> ⚠️ ${t.notice}

---

## 🌐 ${t.galleryCta}

${t.gallerySub}

<a href="${galleryUrl(code)}">
  <img src="${asset('gallery', code)}" alt="AI PPT Prompt Library gallery" width="100%" />
</a>

**[👉 ${t.galleryCta} →](${galleryUrl(code)})**

---

## 📊 ${t.stats}

| | |
|---|---|
| 📝 ${t.total} | **${prompts.length}** |
| 🏷️ ${t.useCases} | **${useCases.length}** |
| 🎨 ${t.styles} | **${styles.length}** |
| 🌍 ${t.locales} | **${LOCALES.length}** |

**${t.useCases}:** ${useCases.map((v) => label(code, 'categories', v)).join(' · ')}

**${t.styles}:** ${styles.map((v) => label(code, 'styles', v)).join(' · ')}

---

## 📋 ${t.allPrompts}

${entries.join('\n---\n\n')}

---

## 🤝 ${t.contributing}

${t.contributeBody}

## 📄 ${t.license}

${t.licenseBody}

## 🙏 ${t.ack}

- [SlideSpeak/presentation-design-prompts](https://github.com/SlideSpeak/presentation-design-prompts) (MIT)
- [AAAAAAAJ/slides](https://github.com/AAAAAAAJ/slides) (MIT)
- [SurgePix](https://surgepix.ai) — AI tools for creating and editing visuals

## ⭐ ${t.starHistory}

[![Star History Chart](https://api.star-history.com/svg?repos=SurgePix/ai-ppt-prompts&type=Date)](https://star-history.com/#SurgePix/ai-ppt-prompts&Date)
`;
}

for (const { code, file } of LOCALES) {
  const out = render(code);
  fs.writeFileSync(path.join(root, file), out);
  console.log(`${file.padEnd(20)} ${(Buffer.byteLength(out) / 1024).toFixed(0)} KB`);
}
