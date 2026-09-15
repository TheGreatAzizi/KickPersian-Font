// KTP - Font | options.js | By TheAzizi | v2.2.0 پایدار
const grid = document.getElementById('fontGrid');
const quickSelect = document.getElementById('quickSelect');
const weightSelect = document.getElementById('weightSelect');
const sizeSelect = document.getElementById('sizeSelect');
const enabledToggle = document.getElementById('enabledToggle');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const favFilter = document.getElementById('favFilter');
const resetBtn = document.getElementById('resetBtn');
const liveMain = document.getElementById('liveMain');
const liveSub = document.getElementById('liveSub');
const currentName = document.getElementById('currentName');
const weightHint = document.getElementById('weightHint');
const toast = document.getElementById('toast');

let currentSettings = { ...KTP_DEFAULTS };
let loadedFonts = new Set();
let searchQuery = '';
let selectedCategory = 'all';
let showFavOnly = false;

function showToast(msg){
  const span = toast.querySelector('span');
  if (span) span.textContent = msg; else toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2500);
}

function loadFont(font){
  if(loadedFonts.has(font.id)) return Promise.resolve();
  return new Promise(resolve=>{
    const link = document.createElement('link');
    link.rel='stylesheet';
    link.href=font.url;
    link.onload=()=>resolve();
    link.onerror=()=>{
      if (font.fallbackUrl) {
        const fb = document.createElement('link');
        fb.rel='stylesheet';
        fb.href=font.fallbackUrl;
        document.head.appendChild(fb);
      }
      resolve();
    };
    document.head.appendChild(link);
    loadedFonts.add(font.id);
    setTimeout(resolve,1500);
  });
}

function applyPluginFont(fontId) {
  const font = getFontById(fontId);
  loadFont(font);
  document.body.style.fontFamily = `'${font.family}', Tahoma, sans-serif`;
  // هدر هم با فونت انتخابی
  const h1 = document.querySelector('.navbar h1');
  if (h1) h1.style.fontFamily = `'${font.family}', Tahoma, sans-serif`;
}

function filteredFonts(){
  return KTP_FONTS.filter(f=>{
    if (showFavOnly && !(currentSettings.favorites||[]).includes(f.id)) return false;
    if (selectedCategory !== 'all' && !f.category.includes(selectedCategory) && f.category !== selectedCategory) {
      if (selectedCategory === 'سن‌سریف' && f.category.includes('سن‌سریف')) {} else return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const hay = `${f.name} ${f.englishName} ${f.category} ${f.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

async function renderGrid(){
  grid.innerHTML='';
  quickSelect.innerHTML='';

  KTP_FONTS.forEach(f=>{
    const o=document.createElement('option');
    o.value=f.id;
    o.textContent=`${f.name} — ${f.englishName}`;
    if(f.id===currentSettings.fontId) o.selected=true;
    quickSelect.appendChild(o);
  });

  // پری‌لود
  for(const f of KTP_FONTS){ loadFont(f); }

  const list = filteredFonts();
  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#666">فونتی یافت نشد — فیلتر را تغییر دهید</div>';
    return;
  }

  // علاقه‌مندی‌ها اول، بعد محبوب‌ها
  const favSet = new Set(currentSettings.favorites||[]);
  list.sort((a,b)=>{
    const aFav = favSet.has(a.id) ? 0 : 1;
    const bFav = favSet.has(b.id) ? 0 : 1;
    if (aFav !== bFav) return aFav - bFav;
    if (a.popular !== b.popular) return a.popular ? -1 : 1;
    return 0;
  });

  for(const font of list){
    const isFav = favSet.has(font.id);
    const card=document.createElement('div');
    card.className='card'+(font.id===currentSettings.fontId?' selected':'');
    card.dataset.fontId=font.id;
    const starSvg = '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
    const starEmptySvg = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    card.innerHTML=`
      <div class="card-top">
        <div>
          <div class="card-title">${font.name} ${font.popular?'<span class="popular-badge">'+starSvg+' محبوب</span>':''}</div>
          <div class="card-en">${font.englishName} • ${font.weights}</div>
        </div>
        <span class="card-cat"><svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/></svg> ${font.category}</span>
      </div>
      <div class="card-preview" style="font-family:'${font.family}', Tahoma, sans-serif">
        سلام کیک! ۱۲۳
      </div>
      <div class="card-desc">${font.description}</div>
      <div class="card-actions">
        <button class="fav-btn ${isFav?'active':''}" data-fav="${font.id}" title="${isFav?'حذف از علاقه‌مندی':'افزودن به علاقه‌مندی'}">${isFav?starSvg+' علاقه‌مندی':starEmptySvg+' علاقه‌مندی'}</button>
      </div>
    `;
    card.addEventListener('click', async (e)=>{
      if (e.target.closest('.fav-btn')) return;
      await selectFont(font.id);
    });
    const favBtn = card.querySelector('.fav-btn');
    favBtn.addEventListener('click', async (e)=>{
      e.stopPropagation();
      await toggleFavorite(font.id);
    });
    grid.appendChild(card);
  }
  updateLivePreview();
}

async function toggleFavorite(fontId){
  const favs = new Set(currentSettings.favorites||[]);
  if (favs.has(fontId)) favs.delete(fontId); else favs.add(fontId);
  currentSettings.favorites = Array.from(favs);
  await chrome.storage.sync.set({favorites: currentSettings.favorites});
  showToast(favs.has(fontId) ? 'به علاقه‌مندی‌ها اضافه شد' : 'از علاقه‌مندی‌ها حذف شد');
  await renderGrid();
}

async function selectFont(fontId){
  const font=getFontById(fontId);
  currentSettings.fontId=fontId;
  await chrome.storage.sync.set({fontId});
  document.querySelectorAll('.card').forEach(c=>{
    c.classList.toggle('selected', c.dataset.fontId===fontId);
  });
  quickSelect.value=fontId;
  await loadFont(font);
  updateLivePreview();
  showToast(`فونت "${font.name}" انتخاب شد`);
}

function updateLivePreview(){
  const font=getFontById(currentSettings.fontId);
  loadFont(font);
  // متن‌های خود پلاگین هم با فونت انتخابی
  applyPluginFont(currentSettings.fontId);
  currentName.textContent=`— ${font.name}`;
  const effective = getClosestWeight(font, currentSettings.fontWeight);
  liveMain.style.fontFamily=`'${font.family}', Tahoma, sans-serif`;
  liveSub.style.fontFamily=`'${font.family}', Tahoma, sans-serif`;
  liveMain.style.fontWeight=effective;
  liveSub.style.fontWeight=effective;
  const sizeMap={ "90":"20px", "100":"24px", "110":"26px", "120":"28px", "130":"30px" };
  const subSizeMap={ "90":"11px", "100":"13px", "110":"14px", "120":"15px", "130":"16px" };
  liveMain.style.fontSize=sizeMap[currentSettings.fontSize]||"24px";
  liveSub.style.fontSize=subSizeMap[currentSettings.fontSize]||"13px";
  liveMain.parentElement.style.opacity=currentSettings.enabled?"1":"0.4";
  const hintSpan2 = weightHint.querySelector('span');
  const hintMsg2 = `وزن ${currentSettings.fontWeight} برای «${font.name}» موجود نیست - وزن ${effective} اعمال می‌شود (موجود: ${font.weights})`;
  if (effective !== currentSettings.fontWeight) {
    if (hintSpan2) hintSpan2.textContent = hintMsg2; else weightHint.textContent = hintMsg2;
    weightHint.classList.add('show');
  } else {
    weightHint.classList.remove('show');
  }
}

async function loadSettings(){
  const data=await chrome.storage.sync.get(KTP_DEFAULTS);
  if ('bidiFix' in data || 'bidiMode' in data) {
    try { await chrome.storage.sync.remove(['bidiFix','bidiMode']); } catch(e){}
    delete data.bidiFix; delete data.bidiMode;
  }
  currentSettings={...KTP_DEFAULTS, ...data};
  if (!KTP_FONTS.find(f=>f.id===currentSettings.fontId)) currentSettings.fontId = KTP_DEFAULTS.fontId;
  weightSelect.value=currentSettings.fontWeight;
  sizeSelect.value=currentSettings.fontSize;
  enabledToggle.checked=currentSettings.enabled;
  applyPluginFont(currentSettings.fontId);
  await renderGrid();
}

weightSelect.addEventListener('change', async ()=>{
  currentSettings.fontWeight=weightSelect.value;
  await chrome.storage.sync.set({fontWeight:weightSelect.value});
  updateLivePreview();
  showToast('ضخامت ذخیره شد');
});
sizeSelect.addEventListener('change', async ()=>{
  currentSettings.fontSize=sizeSelect.value;
  await chrome.storage.sync.set({fontSize:sizeSelect.value});
  updateLivePreview();
  showToast('اندازه ذخیره شد');
});
enabledToggle.addEventListener('change', async ()=>{
  currentSettings.enabled=enabledToggle.checked;
  await chrome.storage.sync.set({enabled:enabledToggle.checked});
  updateLivePreview();
  showToast(enabledToggle.checked?'پلاگین فعال شد':'پلاگین غیرفعال شد');
});
quickSelect.addEventListener('change', ()=> selectFont(quickSelect.value));

searchInput.addEventListener('input', ()=>{
  searchQuery = searchInput.value.trim();
  renderGrid();
});
categoryFilter.addEventListener('change', ()=>{
  selectedCategory = categoryFilter.value;
  renderGrid();
});
favFilter.addEventListener('change', ()=>{
  showFavOnly = favFilter.checked;
  renderGrid();
});

resetBtn.addEventListener('click', async ()=>{
  if (!confirm('بازنشانی به وزیرمتن و تنظیمات پیش‌فرض؟')) return;
  await chrome.storage.sync.set(KTP_DEFAULTS);
  try { await chrome.storage.sync.remove(['bidiFix','bidiMode']); } catch(e){}
  await loadSettings();
  showToast('بازنشانی شد');
});

document.querySelectorAll('.links a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    chrome.tabs.create({url:a.href});
  });
});

try {
  chrome.storage.onChanged.addListener((changes, area)=>{
    if (area !== 'sync' && area !== 'local') return;
    if (changes.fontId) {
      currentSettings.fontId = changes.fontId.newValue;
      applyPluginFont(changes.fontId.newValue);
      quickSelect.value = changes.fontId.newValue;
      renderGrid();
    }
    if (changes.fontWeight || changes.fontSize) {
      if (changes.fontWeight) currentSettings.fontWeight = changes.fontWeight.newValue;
      if (changes.fontSize) currentSettings.fontSize = changes.fontSize.newValue;
      updateLivePreview();
    }
  });
} catch(e) {}

loadSettings();

