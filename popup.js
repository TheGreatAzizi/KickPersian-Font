// KTP - Font | popup.js | By TheAzizi | v2.2.0 - پایدار

const fontSelect = document.getElementById('fontSelect');
const weightSelect = document.getElementById('weightSelect');
const sizeSelect = document.getElementById('sizeSelect');
const enabledToggle = document.getElementById('enabledToggle');
const preview = document.getElementById('preview');
const statusEl = document.getElementById('status');
const weightHint = document.getElementById('weightHint');
let loadedLinks = new Set();

function showStatus(msg, isError = false) {
  const iconOk = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>';
  const iconErr = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>';
  statusEl.innerHTML = (isError ? iconErr : iconOk) + '<span>' + msg + '</span>';
  statusEl.className = 'status show ' + (isError ? 'error' : 'success');
  statusEl.style.background = isError ? '#1f0f0f' : '#0f1f0f';
  statusEl.style.color = isError ? '#e88' : '#7ec87e';
  statusEl.style.borderColor = isError ? '#3a1e1e' : '#1e3a1e';
  statusEl.style.display = 'flex';
  setTimeout(() => statusEl.style.display = 'none', 2200);
}

function loadFontPreview(font) {
  if (loadedLinks.has(font.id)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = font.url;
  link.onerror = () => {
    if (font.fallbackUrl) {
      const fb = document.createElement('link');
      fb.rel = 'stylesheet';
      fb.href = font.fallbackUrl;
      document.head.appendChild(fb);
    }
  };
  document.head.appendChild(link);
  loadedLinks.add(font.id);
}

function updateWeightHint() {
  const font = getFontById(fontSelect.value);
  const req = weightSelect.value;
  const closest = getClosestWeight(font, req);
  const span = weightHint.querySelector('span');
  if (closest !== req) {
    if (span) span.textContent = `وزن ${req} برای «${font.name}» موجود نیست - وزن ${closest} اعمال می‌شود (${font.weights})`;
    else weightHint.textContent = `وزن ${req} برای «${font.name}» موجود نیست - وزن ${closest} اعمال می‌شود (${font.weights})`;
    weightHint.classList.add('show');
  } else {
    weightHint.classList.remove('show');
  }
}

function applyPluginFont(fontId) {
  const font = getFontById(fontId);
  loadFontPreview(font);
  // اعمال فونت انتخابی به تمام متن‌های خود پلاگین
  document.body.style.fontFamily = `'${font.family}', Tahoma, sans-serif`;
}

function updatePreview() {
  const fontId = fontSelect.value;
  const font = getFontById(fontId);
  loadFontPreview(font);
  updateWeightHint();
  // متن‌های خود پلاگین هم با فونت انتخابی
  applyPluginFont(fontId);
  setTimeout(() => {
    preview.style.fontFamily = `'${font.family}', Tahoma, sans-serif`;
    const effective = getClosestWeight(font, weightSelect.value);
    preview.style.fontWeight = effective;
    preview.style.fontSize = sizeSelect.value === "100" ? "18px" : (18 * parseInt(sizeSelect.value)/100) + "px";
    preview.style.lineHeight = '1.7';
    preview.style.letterSpacing = '-0.01em';
  }, 80);
}

function populateFonts(selectedId, favorites = []) {
  fontSelect.innerHTML = '';

  if (favorites.length > 0) {
    const favFonts = KTP_FONTS.filter(f => favorites.includes(f.id));
    if (favFonts.length > 0) {
      const gFav = document.createElement('optgroup');
      gFav.label = 'علاقه‌مندی‌ها';
      favFonts.forEach(f => {
        const o = document.createElement('option');
        o.value = f.id;
        o.textContent = `${f.name} — ${f.englishName}`;
        if (f.id === selectedId) o.selected = true;
        gFav.appendChild(o);
      });
      fontSelect.appendChild(gFav);
    }
  }

  const popular = KTP_FONTS.filter(f => f.popular);
  const others = KTP_FONTS.filter(f => !f.popular);

  const g1 = document.createElement('optgroup');
  g1.label = 'محبوب‌ترین‌ها';
  popular.forEach(f => {
    const o = document.createElement('option');
    o.value = f.id;
    o.textContent = `${f.name} — ${f.englishName} (${f.category})`;
    if (f.id === selectedId) o.selected = true;
    g1.appendChild(o);
  });
  fontSelect.appendChild(g1);

  const g2 = document.createElement('optgroup');
  g2.label = 'همه فونت‌ها';
  others.forEach(f => {
    const o = document.createElement('option');
    o.value = f.id;
    o.textContent = `${f.name} — ${f.englishName} (${f.category})`;
    if (f.id === selectedId) o.selected = true;
    g2.appendChild(o);
  });
  fontSelect.appendChild(g2);
}

async function loadSettings() {
  const data = await chrome.storage.sync.get(KTP_DEFAULTS);
  if ('bidiFix' in data || 'bidiMode' in data) {
    try { await chrome.storage.sync.remove(['bidiFix','bidiMode']); } catch(e) {}
  }
  const settings = { ...KTP_DEFAULTS, ...data };
  if (!KTP_FONTS.find(f => f.id === settings.fontId)) settings.fontId = KTP_DEFAULTS.fontId;
  populateFonts(settings.fontId, settings.favorites || []);
  weightSelect.value = settings.fontWeight;
  sizeSelect.value = settings.fontSize;
  enabledToggle.checked = settings.enabled;
  fontSelect.disabled = !settings.enabled;
  weightSelect.disabled = !settings.enabled;
  sizeSelect.disabled = !settings.enabled;
  preview.style.opacity = settings.enabled ? '1' : '0.4';
  // اعمال فونت پلاگین قبل از پیش‌نمایش
  applyPluginFont(settings.fontId);
  updatePreview();
}

async function saveSettings() {
  const newSettings = {
    fontId: fontSelect.value,
    fontWeight: weightSelect.value,
    fontSize: sizeSelect.value,
    enabled: enabledToggle.checked
  };
  await chrome.storage.sync.set(newSettings);
  showStatus('ذخیره شد - کیک را ببینید!');
}

fontSelect.addEventListener('change', () => { updatePreview(); saveSettings(); });
weightSelect.addEventListener('change', () => { updatePreview(); saveSettings(); });
sizeSelect.addEventListener('change', () => { updatePreview(); saveSettings(); });
enabledToggle.addEventListener('change', () => {
  fontSelect.disabled = !enabledToggle.checked;
  weightSelect.disabled = !enabledToggle.checked;
  sizeSelect.disabled = !enabledToggle.checked;
  preview.style.opacity = enabledToggle.checked ? '1' : '0.4';
  saveSettings();
});

document.getElementById('openOptions').addEventListener('click', () => {
  if (chrome.runtime.openOptionsPage) chrome.runtime.openOptionsPage();
  else window.open(chrome.runtime.getURL('options.html'));
});

document.getElementById('resetBtn').addEventListener('click', async () => {
  if (!confirm('تنظیمات به حالت پیش‌فرض (وزیرمتن) برگردد؟')) return;
  await chrome.storage.sync.set(KTP_DEFAULTS);
  await loadSettings();
  showStatus('بازنشانی شد');
});

document.querySelectorAll('.footer a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: a.href });
  });
});

// همگام‌سازی زنده اگر از صفحه تنظیمات تغییر کرد
try {
  chrome.storage.onChanged.addListener((changes, area)=>{
    if (area !== 'sync' && area !== 'local') return;
    if (changes.fontId) applyPluginFont(changes.fontId.newValue);
    if (changes.fontWeight || changes.fontId) updatePreview();
  });
} catch(e) {}

loadSettings();
KTP_FONTS.filter(f=>f.popular).slice(0,4).forEach(loadFontPreview);

