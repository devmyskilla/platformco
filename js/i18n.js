const i18n = {
  ar: {
    siteName: 'دنيا الدورات',
    tagline: 'اكتشف وتصفح أفضل منصات التعلم المجانية والمدفوعة',
    filterLanguage: 'اللغة',
    filterCategory: 'التصنيف',
    all: 'الكل',
    freeOnly: 'مجاني فقط',
    withCertificate: 'بشهادة',
    reset: 'إعادة تعيين',
    platformsAvailable: 'منصة متاحة',
    noResults: 'لا توجد منصات مطابقة للبحث',
    details: 'التفاصيل',
    footer: 'جميع الحقوق محفوظة © 2026 دنيا الدورات',
    loading: 'جاري التحميل...',
    backToHome: 'العودة إلى الرئيسية',
    category: 'التصنيف',
    language: 'اللغة',
    price: 'السعر',
    certificate: 'هل الشهادة مجانية؟',
    platformLink: 'رابط المنصة',
    free: 'مجاني',
    paid: 'مدفوع',
    yes: 'نعم',
    no: 'لا',
    unspecified: 'غير محدد',
    visitPlatform: 'زيارة المنصة',
    loadingData: 'جاري تحميل البيانات...',
    platformNotFound: 'عذراً، المنصة غير موجودة',
    errorLoading: '⚠️ حدث خطأ في تحميل البيانات',
  },
  en: {
    siteName: 'Dunya Al-Dawrat',
    tagline: 'Discover and browse the best free and paid learning platforms',
    filterLanguage: 'Language',
    filterCategory: 'Category',
    all: 'All',
    freeOnly: 'Free only',
    withCertificate: 'Certificate',
    reset: 'Reset',
    platformsAvailable: 'platform(s) available',
    noResults: 'No matching platforms found',
    details: 'Details',
    footer: 'All rights reserved \u00a9 2026 Dunya Al-Dawrat',
    loading: 'Loading...',
    backToHome: 'Back to Home',
    category: 'Category',
    language: 'Language',
    price: 'Price',
    certificate: 'Free certificate?',
    platformLink: 'Platform Link',
    free: 'Free',
    paid: 'Paid',
    yes: 'Yes',
    no: 'No',
    unspecified: 'Not specified',
    visitPlatform: 'Visit Platform',
    loadingData: 'Loading data...',
    platformNotFound: 'Sorry, platform not found',
    errorLoading: '\u26a0\ufe0f Error loading data',
  },
  tr: {
    siteName: 'Dunya Al-Dawrat',
    tagline: 'En iyi \u00fccretsiz ve \u00fccretli \u00f6\u011frenme platformlar\u0131n\u0131 ke\u015ffedin',
    filterLanguage: 'Dil',
    filterCategory: 'Kategori',
    all: 'T\u00fcm\u00fc',
    freeOnly: 'Sadece \u00fccretsiz',
    withCertificate: 'Sertifikal\u0131',
    reset: 'S\u0131f\u0131rla',
    platformsAvailable: 'platform mevcut',
    noResults: 'E\u015fle\u015fen platform bulunamad\u0131',
    details: 'Detaylar',
    footer: 'T\u00fcm haklar\u0131 sakl\u0131d\u0131r \u00a9 2026 Dunya Al-Dawrat',
    loading: 'Y\u00fckleniyor...',
    backToHome: 'Ana Sayfaya D\u00f6n',
    category: 'Kategori',
    language: 'Dil',
    price: 'Fiyat',
    certificate: '\u00dccretsiz sertifika?',
    platformLink: 'Platform Ba\u011flant\u0131s\u0131',
    free: '\u00dccretsiz',
    paid: '\u00dccretli',
    yes: 'Evet',
    no: 'Hay\u0131r',
    unspecified: 'Belirtilmemi\u015f',
    visitPlatform: 'Platformu Ziyaret Et',
    loadingData: 'Veriler y\u00fckleniyor...',
    platformNotFound: '\u00dczg\u00fcn\u00fcz, platform bulunamad\u0131',
    errorLoading: '\u26a0\ufe0f Veri y\u00fcklenirken hata olu\u015ftu',
  }
};

const catMap = {
  'برمجة وبيانات':     { ar: 'برمجة وبيانات',       en: 'Programming & Data',  tr: 'Programlama & Veri' },
  'تكنولوجيا':         { ar: 'تكنولوجيا',           en: 'Technology',          tr: 'Teknoloji' },
  'تسويق وأعمال':      { ar: 'تسويق وأعمال',        en: 'Marketing & Business',tr: 'Pazarlama & \u0130\u015f' },
  'تعليم':             { ar: 'تعليم',               en: 'Education',           tr: 'E\u011fitim' },
  'لغات':              { ar: 'لغات',                en: 'Languages',           tr: 'Diller' },
};

const langMap = {
  'إنجليزي':          { ar: 'إنجليزي',          en: 'English',          tr: 'ingilizce' },
  'عربي':             { ar: 'عربي',             en: 'Arabic',           tr: 'Arap\u00e7a' },
  'عربي/إنجليزي':     { ar: 'عربي/إنجليزي',     en: 'Arabic/English',   tr: 'Arap\u00e7a/ingilizce' },
  'متعدد اللغات':     { ar: 'متعدد اللغات',     en: 'Multilingual',     tr: '\u00c7oklu Dil' },
  'إنجليزي/فرنسي':    { ar: 'إنجليزي/فرنسي',    en: 'English/French',   tr: 'ingilizce/Frans\u0131zca' },
  'تركي':              { ar: 'تركي',              en: 'Turkish',          tr: 'T\u00fcrk\u00e7e' },
};

function translateCat(cat) {
  return catMap[cat] ? catMap[cat][currentLang] : cat;
}

function translateLang(lang) {
  return langMap[lang] ? langMap[lang][currentLang] : lang;
}

function pf(p, field) {
  if (!p) return '';
  const val = p[field + '_' + currentLang] || p[field] || '';
  return val;
}

let currentLang = 'ar';
try {
  currentLang = localStorage.getItem('dunya-lang') || 'ar';
} catch(e) {}

function getText(key) {
  return i18n[currentLang][key] || i18n['ar'][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  try { localStorage.setItem('dunya-lang', lang); } catch(e) {}
  document.documentElement.lang = lang === 'ar' ? 'ar' : lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = getText(key);
    } else {
      el.textContent = getText(key);
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = getText(el.getAttribute('data-i18n-title'));
  });

  const selector = document.getElementById('langSwitcher');
  if (selector) {
    selector.value = currentLang;
  }
}
