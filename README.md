# Kick Persian - font

<p align="center">
  <img src="icon128.png" width="96" height="96" alt="KTP - Font">
</p>

<p align="center">
  <a href="https://github.com/TheGreatAzizi/KTP-Font/releases"><img src="https://img.shields.io/github/v/release/TheGreatAzizi/KTP-Font?label=version&color=53FC18&style=flat-square" alt="Version"></a>
  <a href="https://github.com/TheGreatAzizi/KTP-Font/blob/main/manifest.json"><img src="https://img.shields.io/badge/manifest-v3-blue?style=flat-square" alt="Manifest V3"></a>
  <a href="https://developer.chrome.com/docs/extensions/"><img src="https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white" alt="Chrome"></a>
  <a href="https://github.com/TheGreatAzizi/KTP-Font/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License"></a>
  <a href="https://github.com/TheGreatAzizi/KTP-Font"><img src="https://img.shields.io/github/stars/TheGreatAzizi/KTP-Font?style=flat-square" alt="Stars"></a>
</p>

<p align="center">
  <b>فونت فارسی دلخواه برای کیک — 20+ فونت زیبا | فقط متن فارسی تغییر می‌کند</b><br>
  <i>Persian Font Changer for Kick — 20+ beautiful Persian fonts, affects Persian text only</i>
</p>

<p align="center">
  <a href="https://www.youtube.com/@AziziWC"><img src="https://img.shields.io/badge/YouTube-AziziWC-red?style=for-the-badge&logo=youtube" alt="AziziWC"></a>
  <a href="https://www.youtube.com/@The_azizi"><img src="https://img.shields.io/badge/YouTube-The_azizi-red?style=for-the-badge&logo=youtube" alt="The_azizi"></a>
  <a href="https://t.me/luluch_code"><img src="https://img.shields.io/badge/Telegram-luluch_code-27A5E7?style=for-the-badge&logo=telegram" alt="Telegram"></a>
  <a href="https://x.com/the_azzi"><img src="https://img.shields.io/badge/X-the_azzi-black?style=for-the-badge&logo=x" alt="X"></a>
  <a href="https://github.com/TheGreatAzizi"><img src="https://img.shields.io/badge/GitHub-TheGreatAzizi-181717?style=for-the-badge&logo=github" alt="GitHub"></a>
</p>

---

برنامه‌نویس: TheAzizi

## درباره پروژه

**KTP - Font** یک افزونه کروم (Manifest V3) است که متن‌های فارسی در کیک (عنوان ویدیو، توضیحات، کامنت‌ها، چت) را به فونت فارسی دلخواه شما تغییر می‌دهد. متن انگلیسی بدون تغییر باقی می‌ماند. رابط خود افزونه (پاپ‌آپ و صفحه تنظیمات) هم با فونت انتخابی نمایش داده می‌شود.

> About: A Chrome Extension (Manifest V3) that changes Persian text on Kick to your chosen Persian font. English text stays untouched. The extension's own UI also uses the selected font.

## ویژگی‌ها

- **20+ فونت فارسی:** Vazirmatn, Estedad, Lalezar, Shabnam, Samim, Sahel, Parastoo, Gandom, Tanha, Yekan Bakh, IRANSans, Noto Naskh/Sans Arabic, Amiri, Markazi Text, Mirza و ...
- **فقط فارسی دقیق:** تشخیص با `[\u0600-\u06FF\u200C\u200D]` و اسکیپ آیکن، ورودی، کد و المنت‌های مخفی
- **وزن هوشمند:** اگر فونت درخواستی را نداشته باشد نزدیک‌ترین وزن اعمال و اطلاع داده می‌شود (`getClosestWeight` در `fonts.js`)
- **پرفورمنس بهینه:** `WeakSet` + `requestIdleCallback` + `requestAnimationFrame` + توقف هنگام `document.hidden` + بک‌آپ هر ۴ ثانیه
- **خوانایی:** `line-height:1.7` / `letter-spacing:-0.01em` / `font-smoothing` خودکار در `content.js`
- **فال‌بک CDN:** خطای `cdn.jsdelivr.net` خودکار به Vazirmatn گوگل سوئیچ می‌کند
- **رابط کامل:** پاپ‌آپ سریع + صفحه تنظیمات با جستجو، فیلتر دسته، ستاره علاقه‌مندی، پیش‌نمایش زنده و بازنشانی — همه با SVG بدون ایموجی
- **سازگار با SPA کیک:** هندل `yt-navigate-finish` و محتوای داینامیک

## فونت‌ها

| نام | خانواده | دسته | وزن‌ها |
|---|---|---|---|
| وزیرمتن | Vazirmatn | سن‌سریف مدرن | 100-900 |
| استعداد | Estedad | سن‌سریف | 100-900 |
| لاله‌زار | Lalezar | نمایشی | 400 |
| شبنم | Shabnam | سن‌سریف | 300,400,500,700 |
| صمیم | Samim | سن‌سریف گرد | 400,700 |
| ساحل | Sahel | سن‌سریف | 400,700,900 |
| پرستو | Parastoo | سریف | 400,700 |
| گندم | Gandom | سن‌سریف | 400,700 |
| تنها | Tanha | دست‌نویس | 400 |
| یکان‌بخ | Yekan Bakh | سن‌سریف | 100-900 |
| ایران‌سنس | IRANSans | سن‌سریف | 300,400,500,700 |
| نوتو نسخ/سنس، امیری، مرکزی، میرزا، بالو، المسری، چانگا، ریم کوفی، شهرزاد | Google Fonts | متنوع | 400-900 |

منبع فونت‌ها: `fonts.googleapis.com` و `cdn.jsdelivr.net/gh/rastikerdar`

## نصب

### نصب دستی (Developer Mode) — پیشنهادی

1. پروژه را دانلود کنید: `git clone https://github.com/TheGreatAzizi/KTP-Font.git` یا ZIP دانلود
2. در کروم به `chrome://extensions` بروید
3. `Developer mode` را از بالا فعال کنید
4. `Load unpacked` را بزنید و پوشه `KTP-Font` را انتخاب کنید
5. وارد کیک شوید، روی آیکون افزونه کلیک کنید و فونت را انتخاب کنید

### از Chrome Web Store

به‌زودی منتشر می‌شود.

## استفاده

1. روی آیکون KTP - Font در نوار ابزار کلیک کنید
2. فونت، ضخامت و اندازه را انتخاب کنید (پیش‌نمایش زنده می‌بینید)
3. خودکار ذخیره و روی کیک اعمال می‌شود — نیازی به رفرش نیست
4. برای جستجو و علاقه‌مندی‌ها `تنظیمات کامل` را باز کنید

## ساختار پروژه

```
KTP-Font/
├── manifest.json   # Manifest V3, v1.0.0
├── fonts.js        # دیتابیس 21 فونت + KTP_DEFAULTS + getClosestWeight
├── content.js      # تشخیص فارسی، اعمال فونت، WeakSet، observer بهینه
├── background.js   # نصب و مهاجرت storage
├── popup.html      # پاپ‌آپ 360px + SVG
├── popup.js        # منطق پاپ‌آپ + اعمال فونت به خود پلاگین
├── options.html    # صفحه تنظیمات + گرید + جستجو + SVG
├── options.js      # منطق تنظیمات + علاقه‌مندی
├── icon16.png / icon48.png / icon128.png
└── README.md
```

## نحوه کار

- `content.js:6` متن فارسی با `/[\u0600-\u06FF\u200C\u200D]/` شناسایی می‌شود
- `content.js:14` لینک فونت از CDN لود و `content.js:32` کلاس `ktp-font-applied` با `!important` اعمال می‌شود
- `MutationObserver` با `requestIdleCallback` محتوای جدید کیک را پوشش می‌دهد
- تنظیمات در `chrome.storage.sync` ذخیره و بین پاپ‌آپ و تب کیک لایو همگام می‌شود

## توسعه

```bash
git clone https://github.com/TheGreatAzizi/KTP-Font.git
cd KTP-Font
# تغییری بده، سپس در chrome://extensions -> Reload
```

پیشنهاد یا باگ را در [Issues](https://github.com/TheGreatAzizi/KTP-Font/issues) ثبت کنید.

## لینک‌های سازنده

- YouTube AziziWC: https://www.youtube.com/@AziziWC
- YouTube The_azizi: https://www.youtube.com/@The_azizi
- Telegram: https://t.me/luluch_code
- X: https://x.com/the_azzi
- GitHub: https://github.com/TheGreatAzizi

## لایسنس

MIT License — فایل [LICENSE](LICENSE) را ببینید.

---

ساخته شده توسط TheAzizi

