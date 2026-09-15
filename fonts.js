// Kick Persian - font | By TheAzizi | v2.2.0
// لیست کامل فونت‌های فارسی - هر فونت شامل نام، خانواده و لینک CDN

const KTP_VERSION = "1.0.0";

const KTP_FONTS = [
  {
    id: "vazirmatn",
    name: "وزیرمتن",
    englishName: "Vazirmatn",
    family: "Vazirmatn",
    category: "سن‌سریف مدرن",
    url: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap",
    weights: "100-900",
    popular: true,
    description: "محبوب‌ترین فونت فارسی - تمیز و خوانا"
  },
  {
    id: "estedad",
    name: "استعداد",
    englishName: "Estedad",
    family: "Estedad",
    category: "سن‌سریف",
    url: "https://fonts.googleapis.com/css2?family=Estedad:wght@100;200;300;400;500;600;700;800;900&display=swap",
    weights: "100-900",
    popular: true,
    description: "فونت جدید و حرفه‌ای گوگل"
  },
  {
    id: "lalezar",
    name: "لاله‌زار",
    englishName: "Lalezar",
    family: "Lalezar",
    category: "نمایشی",
    url: "https://fonts.googleapis.com/css2?family=Lalezar&display=swap",
    weights: "400",
    popular: true,
    description: "فونت ضخیم و نمایشی برای عناوین"
  },
  {
    id: "shabnam",
    name: "شبنم",
    englishName: "Shabnam",
    family: "Shabnam",
    category: "سن‌سریف",
    url: "https://cdn.jsdelivr.net/gh/rastikerdar/shabnam-font@v5.0.1/dist/font-face.css",
    weights: "300,400,500,700",
    popular: true,
    description: "یکی از پرکاربردترین فونت‌های وب فارسی"
  },
  {
    id: "samim",
    name: "صمیم",
    englishName: "Samim",
    family: "Samim",
    category: "سن‌سریف گرد",
    url: "https://cdn.jsdelivr.net/gh/rastikerdar/samim-font@v4.0.5/dist/font-face.css",
    weights: "400,700",
    popular: true,
    description: "فونت گرد و دوستانه"
  },
  {
    id: "sahel",
    name: "ساحل",
    englishName: "Sahel",
    family: "Sahel",
    category: "سن‌سریف",
    url: "https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v3.4.0/dist/font-face.css",
    weights: "400,700,900",
    popular: true,
    description: "فونت ساده و خوانا - مناسب متن طولانی"
  },
  {
    id: "parastoo",
    name: "پرستو",
    englishName: "Parastoo",
    family: "Parastoo",
    category: "سریف",
    url: "https://cdn.jsdelivr.net/gh/rastikerdar/parastoo-font@v1.0.1/dist/font-face.css",
    weights: "400,700",
    popular: false,
    description: "فونت سریف کلاسیک فارسی"
  },
  {
    id: "gandom",
    name: "گندم",
    englishName: "Gandom",
    family: "Gandom",
    category: "سن‌سریف",
    url: "https://cdn.jsdelivr.net/gh/rastikerdar/gandom-font@v0.9.0/dist/font-face.css",
    weights: "400,700",
    popular: false,
    description: "فونت دست‌نویس مانند"
  },
  {
    id: "tanha",
    name: "تنها",
    englishName: "Tanha",
    family: "Tanha",
    category: "دست‌نویس",
    url: "https://cdn.jsdelivr.net/gh/rastikerdar/tanha-font@v0.9/dist/font-face.css",
    weights: "400",
    popular: false,
    description: "فونت دست‌نویس زیبا"
  },
  {
    id: "yekanbakh",
    name: "یکان‌بخ",
    englishName: "Yekan Bakh",
    family: "Yekan Bakh",
    category: "سن‌سریف",
    url: "https://cdn.jsdelivr.net/gh/rastikerdar/yekan-bakh-font@v5.0.0/dist/font-face.css",
    weights: "100-900",
    popular: true,
    description: "نسخه جدید و بهینه یکان"
  },
  {
    id: "noto-naskh",
    name: "نوتو نسخ",
    englishName: "Noto Naskh Arabic",
    family: "Noto Naskh Arabic",
    category: "نسخ عربی",
    url: "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap",
    weights: "400-700",
    popular: false,
    description: "فونت نسخ حرفه‌ای گوگل"
  },
  {
    id: "noto-sans-arabic",
    name: "نوتو سنس عربی",
    englishName: "Noto Sans Arabic",
    family: "Noto Sans Arabic",
    category: "سن‌سریف",
    url: "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap",
    weights: "100-900",
    popular: false,
    description: "خانواده نوتو - استاندارد جهانی"
  },
  {
    id: "amiri",
    name: "امیری",
    englishName: "Amiri",
    family: "Amiri",
    category: "سریف سنتی",
    url: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap",
    weights: "400,700",
    popular: false,
    description: "فونت کلاسیک الهام از نسخ قدیم"
  },
  {
    id: "markazi",
    name: "مرکزی",
    englishName: "Markazi Text",
    family: "Markazi Text",
    category: "سریف",
    url: "https://fonts.googleapis.com/css2?family=Markazi+Text:wght@400;500;600;700&display=swap",
    weights: "400-700",
    popular: false,
    description: "فونت خوانا برای متن‌های بلند"
  },
  {
    id: "mirza",
    name: "میرزا",
    englishName: "Mirza",
    family: "Mirza",
    category: "نستعلیق",
    url: "https://fonts.googleapis.com/css2?family=Mirza:wght@400;500;600;700&display=swap",
    weights: "400-700",
    popular: false,
    description: "حالت نستعلیق مدرن"
  },
  {
    id: "baloo",
    name: "بالو",
    englishName: "Baloo Bhaijaan 2",
    family: "Baloo Bhaijaan 2",
    category: "نمایشی گرد",
    url: "https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;500;600;700;800&display=swap",
    weights: "400-800",
    popular: false,
    description: "فونت فانتزی و گرد"
  },
  {
    id: "el-messiri",
    name: "المسیری",
    englishName: "El Messiri",
    family: "El Messiri",
    category: "سن‌سریف",
    url: "https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&display=swap",
    weights: "400-700",
    popular: false,
    description: "فونت عربی-فارسی ظریف"
  },
  {
    id: "changa",
    name: "چانگا",
    englishName: "Changa",
    family: "Changa",
    category: "سن‌سریف",
    url: "https://fonts.googleapis.com/css2?family=Changa:wght@200;300;400;500;600;700;800&display=swap",
    weights: "200-800",
    popular: false,
    description: "فونت مدرن چندوزنه"
  },
  {
    id: "reem-kufi",
    name: "ریم کوفی",
    englishName: "Reem Kufi",
    family: "Reem Kufi",
    category: "کوفی",
    url: "https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&display=swap",
    weights: "400-700",
    popular: false,
    description: "فونت کوفی هندسی"
  },
  {
    id: "scheherazade",
    name: "شهرزاد",
    englishName: "Scheherazade New",
    family: "Scheherazade New",
    category: "نسخ",
    url: "https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;500;600;700&display=swap",
    weights: "400-700",
    popular: false,
    description: "فونت نسخ کلاسیک زیبا"
  },
  {
    id: "iransans",
    name: "ایران‌سنس",
    englishName: "IRANSans",
    family: "IRANSans",
    category: "سن‌سریف",
    url: "https://cdn.jsdelivr.net/gh/rastikerdar/iran-sans-font@v1.0.0/dist/font-face.css",
    fallbackUrl: "https://fonts.googleapis.com/css2?family=Vazirmatn&display=swap",
    weights: "300,400,500,700",
    popular: true,
    description: "فونت محبوب ایران‌سنس (فال‌بک وزیرمتن اگر لود نشد)"
  }
];

// تنظیمات پیش‌فرض - نسخه پایدار بدون Bidi
const KTP_DEFAULTS = {
  enabled: true,
  fontId: "vazirmatn",
  fontWeight: "400",
  fontSize: "100",
  favorites: []
};

// هلپر: پیدا کردن فونت با ID
function getFontById(id) {
  return KTP_FONTS.find(f => f.id === id) || KTP_FONTS[0];
}

// هلپر تضمینی: نزدیک‌ترین وزن موجود برای فونت را برگردان
// مثلا Lalezar فقط 400 دارد و کاربر 700 انتخاب کرده → 400 برمی‌گردد
function getClosestWeight(font, requestedWeight) {
  const req = parseInt(requestedWeight, 10);
  if (!font || !font.weights) return String(req);
  const w = font.weights.trim();
  // حالت "100-900" یا "400-700"
  const rangeMatch = w.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1], 10);
    const max = parseInt(rangeMatch[2], 10);
    if (req < min) return String(min);
    if (req > max) return String(max);
    return String(req);
  }
  // حالت لیستی "300,400,500,700"
  const parts = w.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n)).sort((a,b)=>a-b);
  if (parts.length === 0) return String(req);
  if (parts.includes(req)) return String(req);
  // نزدیک‌ترین
  let closest = parts[0];
  let diff = Math.abs(req - closest);
  for (const p of parts) {
    const d = Math.abs(req - p);
    if (d < diff) { diff = d; closest = p; }
  }
  return String(closest);
}

// هلپر: آیا وزن برای فونت موجود است؟
function isWeightAvailable(font, weight) {
  return getClosestWeight(font, weight) === String(parseInt(weight,10));
}

// برای استفاده در content script و popup/options
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KTP_FONTS, KTP_DEFAULTS, KTP_VERSION, getFontById, getClosestWeight };
}

