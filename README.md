# Kick Persian - font
[![DevSponsors](https://devsponsors.github.io/assets/badges/sponsor.svg)](https://devsponsors.github.io)
<p align="center">
  <img src="icon128.png" width="96" height="96" alt="Kick Persian - font">
</p>

<p align="center">
  <a href="https://github.com/TheGreatAzizi/KickPersian-Font/releases"><img src="https://img.shields.io/github/v/release/TheGreatAzizi/KickPersian-Font?label=version&color=53FC18&style=flat-square" alt="Version"></a>
  <a href="https://github.com/TheGreatAzizi/KickPersian-Font/blob/main/manifest.json"><img src="https://img.shields.io/badge/manifest-v3-blue?style=flat-square" alt="Manifest V3"></a>
  <a href="https://developer.chrome.com/docs/extensions/"><img src="https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white" alt="Chrome"></a>
  <a href="https://github.com/TheGreatAzizi/KickPersian-Font/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License"></a>
  <a href="https://github.com/TheGreatAzizi/KickPersian-Font"><img src="https://img.shields.io/github/stars/TheGreatAzizi/KickPersian-Font?style=flat-square" alt="Stars"></a>
</p>

<p align="center">
  <b>فونت فارسی دلخواه برای کیک — 20+ فونت زیبا | حتی داخل چت استریمر</b><br>
  <i>Persian Font Changer for Kick — 20+ beautiful Persian fonts, optimized for streamer chat</i>
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

**Kick Persian - font** یک افزونه کروم (Manifest V3) است که متن‌های فارسی در کیک (kick.com) را به فونت فارسی دلخواه شما تغییر می‌دهد. تمرکز اصلی روی چت استریمر است — چت فارسی کیک با فونت پیش‌فرض بسیار بد نمایش داده می‌شود و این افزونه آن را خوانا می‌کند. حتی چت پاپ‌اوت OBS هم پوشش داده می‌شود. متن انگلیسی بدون تغییر می‌ماند و رابط خود افزونه هم با فونت انتخابی نمایش داده می‌شود.

> About: A Chrome Extension (Manifest V3) that changes Persian text on Kick (kick.com) to your chosen font, with special focus on streamer chat (including OBS popout). English text stays untouched.

## ویژگی‌ها

- **20+ فونت فارسی:** Vazirmatn, Estedad, Lalezar, Shabnam, Samim, Sahel, Parastoo, Gandom, Tanha, Yekan Bakh, IRANSans, Noto Naskh/Sans Arabic, Amiri, Markazi Text, Mirza و ...
- **تمرکز ویژه چت استریمر:** استایل اختصاصی برای `#chatroom` و `chat-history` با `line-height:1.85` و `word-break:break-word` — چت فارسی در لایو و پاپ‌اوت خوانا می‌شود
- **فقط فارسی دقیق:** تشخیص با `[\u0600-\u06FF\u200C\u200D]` و اسکیپ آیکن، ایموت، ورودی و کد
- **وزن هوشمند:** اگر فونت وزن درخواستی را نداشته باشد نزدیک‌ترین وزن اعمال می‌شود (`getClosestWeight` در `fonts.js:257`)
- **پرفورمنس بهینه:** `WeakSet` + `requestIdleCallback` + توقف هنگام `document.hidden` + observer اختصاصی چت
- **خوانایی:** `line-height:1.7` و `letter-spacing:-0.01em` خودکار
- **فال‌بک CDN:** خطای `cdn.jsdelivr.net` خودکار به Vazirmatn گوگل
- **رابط کامل:** پاپ‌آپ و تنظیمات با جستجو، فیلتر دسته، علاقه‌مندی و پیش‌نمایش زنده — همه با SVG بدون ایموجی
- **سازگار با SPA کیک:** هندل `popstate` و محتوای داینامیک چت

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

منبع: `fonts.googleapis.com` و `cdn.jsdelivr.net/gh/rastikerdar`

## نصب

### نصب دستی (Developer Mode) — پیشنهادی

1. پروژه را دانلود کنید: `git clone https://github.com/TheGreatAzizi/KickPersian-Font.git` یا از Releases ZIP بگیرید
2. در کروم به `chrome://extensions` بروید
3. `Developer mode` را فعال کنید
4. `Load unpacked` را بزنید و پوشه `KickPersian-Font` (یا `KTP-Font` اگر با همین نام دانلود کردید) را انتخاب کنید
5. وارد `kick.com` شوید، روی آیکون افزونه کلیک کنید و فونت را انتخاب کنید

### Chrome Web Store

به‌زودی منتشر می‌شود.

## استفاده

1. روی آیکون Kick Persian - font در نوار ابزار کلیک کنید
2. فونت، ضخامت و اندازه را انتخاب کنید (پیش‌نمایش زنده)
3. خودکار روی کیک و چت استریمر اعمال می‌شود — نیازی به رفرش نیست
4. برای جستجو و علاقه‌مندی‌ها `تنظیمات کامل` را باز کنید

## ساختار پروژه

```
KickPersian-Font/
├── manifest.json   # Manifest V3, v1.0.0 - host kick.com
├── fonts.js        # دیتابیس 21 فونت + KTP_DEFAULTS + getClosestWeight
├── content.js      # تشخیص فارسی + استایل ویژه چت استریمر + observer بهینه
├── background.js   # نصب و مهاجرت storage
├── popup.html      # پاپ‌آپ 360px + SVG
├── popup.js        # منطق پاپ‌آپ + اعمال فونت به خود پلاگین
├── options.html    # تنظیمات + گرید + جستجو + SVG
├── options.js      # منطق تنظیمات + علاقه‌مندی
├── icon16.png / icon48.png / icon128.png  # سبز کیک #53FC18
└── README.md
```

## نحوه کار

- `content.js:4` متن فارسی با `/[\u0600-\u06FF\u200C\u200D]/` شناسایی می‌شود
- `content.js:21` لینک فونت از CDN لود و `content.js:64` کلاس `ktp-font-applied` با `!important` اعمال می‌شود
- برای چت کیک استایل جداگانه با `line-height:1.85` در `content.js:70` اعمال می‌شود
- `enhanceKickChatObserver()` در `content.js:318` کانتینر `#chatroom` را با observer اختصاصی دنبال می‌کند
- تنظیمات در `chrome.storage.sync` ذخیره و لایو همگام می‌شود

## توسعه

```bash
git clone https://github.com/TheGreatAzizi/KickPersian-Font.git
cd KickPersian-Font
# تغییری بده، سپس در chrome://extensions -> Reload
```

پیشنهاد یا باگ را در [Issues](https://github.com/TheGreatAzizi/KickPersian-Font/issues) ثبت کنید.

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
