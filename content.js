// Kick Persian - font | By TheAzizi | v1.0.0 | content.js
// نسخه ویژه کیک - تمرکز ویژه روی چت استریمر

const persianRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u200C\u200D]/;
const PROCESSED_CLASS = 'ktp-font-applied';
const STYLE_ID = 'ktp-font-dynamic-style';
const LINK_ID = 'ktp-font-link';

let currentSettings = { ...KTP_DEFAULTS };
let currentFont = getFontById(currentSettings.fontId);

const processedElements = new WeakSet();
let lastAppliedFontId = null;
let lastAppliedWeight = null;
let lastAppliedSize = null;

// --- مدیریت فونت و استایل ---

function ensureFontLink(font) {
  let link = document.getElementById(LINK_ID);
  if (!link) {
    link = document.createElement('link');
    link.id = LINK_ID;
    link.rel = 'stylesheet';
    link.onerror = () => {
      if (font.fallbackUrl && link.href !== font.fallbackUrl) {
        link.href = font.fallbackUrl;
      } else if (font.id !== 'vazirmatn') {
        const fallback = getFontById('vazirmatn');
        link.href = fallback.url;
      }
    };
    (document.head || document.documentElement).appendChild(link);
  }
  if (link.href !== font.url) {
    link.href = font.url;
  }
}

function ensureDynamicStyle() {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    (document.head || document.documentElement).appendChild(style);
  }
  return style;
}

function updateDynamicStyle() {
  const style = ensureDynamicStyle();
  if (!currentSettings.enabled) {
    style.textContent = '';
    removeAllAppliedFonts();
    return;
  }

  const font = currentFont;
  const effectiveWeight = typeof getClosestWeight === 'function' ? getClosestWeight(font, currentSettings.fontWeight) : currentSettings.fontWeight;

  style.textContent = `
    .${PROCESSED_CLASS} {
      font-family: '${font.family}', Tahoma, sans-serif !important;
      font-weight: ${effectiveWeight} !important;
      ${currentSettings.fontSize !== "100" ? `font-size: ${currentSettings.fontSize}% !important;` : ""}
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
      text-rendering: optimizeLegibility !important;
      font-feature-settings: "ss01" 1 !important;
      line-height: 1.7 !important;
      letter-spacing: -0.01em !important;
    }
    .${PROCESSED_CLASS} * {
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
    input.${PROCESSED_CLASS}, textarea.${PROCESSED_CLASS}, [contenteditable].${PROCESSED_CLASS}, code.${PROCESSED_CLASS}, pre.${PROCESSED_CLASS} {
      line-height: inherit !important;
    }
    /* ===== تمرکز ویژه روی چت کیک برای استریمر ===== */
    /* چت اصلی کیک - تمام حالت‌ها: صفحه کانال، تئاتر مود، پاپ‌اوت */
    #chatroom, [id*="chatroom"], [class*="chatroom"], [class*="ChatRoom"],
    [data-testid*="chat" i], [class*="chat-history" i], [class*="chat-container" i],
    [class*="ChatContainer" i], #channel-chat, [id*="channel-chat" i],
    [class*="chat-entry" i], [class*="ChatEntry" i],
    [class*="chat-message" i], [class*="ChatMessage" i], [class*="message-content" i],
    [class*="chat-line" i] {
      word-break: break-word !important;
      overflow-wrap: anywhere !important;
    }
    /* پیام‌های داخل چت که فارسی هستند - اولویت خیلی بالا برای استریمر */
    #chatroom .${PROCESSED_CLASS},
    [class*="chat"] .${PROCESSED_CLASS},
    [data-testid*="chat"] .${PROCESSED_CLASS},
    #channel-chat .${PROCESSED_CLASS} {
      line-height: 1.85 !important;
      letter-spacing: -0.015em !important;
      word-break: break-word !important;
      overflow-wrap: anywhere !important;
      white-space: pre-wrap !important;
    }
    /* یوزرنیم و متن پیام در چت - فاصله بهتر برای خوانایی استریمر */
    [class*="chat"] .${PROCESSED_CLASS} span,
    [class*="chat"] .${PROCESSED_CLASS} div {
      line-height: inherit !important;
    }
  `;
  lastAppliedFontId = font.id;
  lastAppliedWeight = effectiveWeight;
  lastAppliedSize = currentSettings.fontSize;
}

function removeAllAppliedFonts() {
  document.querySelectorAll('.' + PROCESSED_CLASS).forEach(el => {
    el.classList.remove(PROCESSED_CLASS);
    el.style.removeProperty('font-family');
    el.style.removeProperty('font-weight');
    el.style.removeProperty('font-size');
    el.style.removeProperty('-webkit-font-smoothing');
    el.style.removeProperty('text-rendering');
    el.style.removeProperty('line-height');
    el.style.removeProperty('letter-spacing');
  });
  lastAppliedFontId = null;
  lastAppliedWeight = null;
  lastAppliedSize = null;
}

function containsPersian(text) {
  return persianRegex.test(text);
}

function shouldSkipElement(el) {
  if (!el || !el.tagName) return true;
  const tag = el.tagName;
  if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'LINK' || tag === 'SVG' || tag === 'CANVAS' || tag === 'IMG' || tag === 'VIDEO' || tag === 'IFRAME') return true;
  if (el.isContentEditable) return true;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'CODE' || tag === 'PRE') return true;
  if (el.closest && el.closest('svg, [hidden], template, [class*="emote" i]')) {
    // اگر خود المنت ایموت است اسکیپ، ولی والد پیام نه
    if (el.matches && el.matches('img, svg, [class*="emote" i]')) return true;
  }
  if (el.closest && el.closest('[hidden]')) return true;
  return false;
}

function isVisibleElement(el) {
  try {
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
  } catch(e) {}
  return true;
}

// آیا داخل چت کیک هستیم؟
function isInsideKickChat(el) {
  if (!el || !el.closest) return false;
  return !!el.closest('#chatroom, [id*="chatroom" i], [class*="chatroom" i], #channel-chat, [class*="chat-history" i], [data-testid*="chat" i], [class*="ChatRoom" i]');
}

function applyToRoot(root = document.body) {
  if (!root || !currentSettings.enabled) return;
  if (document.hidden) return;

  const effectiveWeight = typeof getClosestWeight === 'function' ? getClosestWeight(currentFont, currentSettings.fontWeight) : currentSettings.fontWeight;
  const isChatRoot = isInsideKickChat(root) || (root.id && root.id.toLowerCase().includes('chat')) || (root.className && typeof root.className === 'string' && root.className.toLowerCase().includes('chat'));

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (shouldSkipElement(parent)) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (!containsPersian(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  let n;
  while (n = walker.nextNode()) nodes.push(n);

  const batch = () => {
    for (const textNode of nodes) {
      const parent = textNode.parentElement;
      if (!parent) continue;
      if (shouldSkipElement(parent)) continue;
      if (processedElements.has(parent) && parent.classList.contains(PROCESSED_CLASS)) {
        if (lastAppliedFontId !== currentFont.id || lastAppliedWeight !== effectiveWeight) {
          parent.style.setProperty('font-family', `'${currentFont.family}', Tahoma, sans-serif`, 'important');
          parent.style.setProperty('font-weight', effectiveWeight, 'important');
          if (currentSettings.fontSize !== "100") {
            parent.style.setProperty('font-size', currentSettings.fontSize + '%', 'important');
          } else {
            parent.style.removeProperty('font-size');
          }
          // برای چت استریمر line-height بیشتر
          if (isInsideKickChat(parent)) {
            parent.style.setProperty('line-height', '1.85', 'important');
          }
        }
        continue;
      }
      if (!isVisibleElement(parent)) continue;

      parent.classList.add(PROCESSED_CLASS);
      processedElements.add(parent);
      parent.style.setProperty('font-family', `'${currentFont.family}', Tahoma, sans-serif`, 'important');
      parent.style.setProperty('font-weight', effectiveWeight, 'important');
      if (currentSettings.fontSize !== "100") {
        parent.style.setProperty('font-size', currentSettings.fontSize + '%', 'important');
      }
      if (isInsideKickChat(parent)) {
        parent.style.setProperty('line-height', '1.85', 'important');
        parent.style.setProperty('letter-spacing', '-0.015em', 'important');
      }
    }
  };

  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(batch);
  } else {
    batch();
  }

  // برای چت کیک: همچنین با سلکتور مستقیم چک کن (برای پیام‌هایی که داخل shadow یا virtual list هستند)
  if (isChatRoot || root === document.body) {
    const chatSelectors = [
      '[data-testid*="chat"]',
      '[class*="chat-message" i]',
      '[class*="ChatMessage" i]',
      '[class*="chat-entry" i]',
      '[class*="message-content" i]',
      '#chatroom',
      '#channel-chat'
    ];
    try {
      const extra = root.querySelectorAll ? root.querySelectorAll(chatSelectors.join(',')) : [];
      extra.forEach(el => {
        if (el.textContent && containsPersian(el.textContent) && !el.classList.contains(PROCESSED_CLASS) && isVisibleElement(el)) {
          // اگر خود کانتینر چت است، فرزندانش را جداگانه هندل کن تا ایموت‌ها خراب نشوند
          // ولی اگر متن مستقیم دارد، اعمال کن
          const hasDirectPersianText = Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && containsPersian(node.nodeValue));
          if (hasDirectPersianText) {
            el.classList.add(PROCESSED_CLASS);
            processedElements.add(el);
            el.style.setProperty('font-family', `'${currentFont.family}', Tahoma, sans-serif`, 'important');
            el.style.setProperty('font-weight', effectiveWeight, 'important');
          } else {
            // فرزندان
            applyToRoot(el);
          }
        }
      });
    } catch(e) {}
  }
}

function reApplyAll() {
  const effectiveWeight = typeof getClosestWeight === 'function' ? getClosestWeight(currentFont, currentSettings.fontWeight) : currentSettings.fontWeight;
  document.querySelectorAll('.' + PROCESSED_CLASS).forEach(el => {
    if (shouldSkipElement(el)) return;
    el.style.setProperty('font-family', `'${currentFont.family}', Tahoma, sans-serif`, 'important');
    el.style.setProperty('font-weight', effectiveWeight, 'important');
    if (currentSettings.fontSize !== "100") {
      el.style.setProperty('font-size', currentSettings.fontSize + '%', 'important');
    } else {
      el.style.removeProperty('font-size');
    }
    if (isInsideKickChat(el)) {
      el.style.setProperty('line-height', '1.85', 'important');
    }
  });
  applyToRoot(document.body);
}

async function loadSettings() {
  try {
    let stored = {};
    try { stored = await chrome.storage.sync.get(null); } catch(e) {}
    if (!stored || Object.keys(stored).length === 0) {
      try { stored = await chrome.storage.local.get(null); } catch(e) {}
    }
    if ('bidiFix' in stored || 'bidiMode' in stored) {
      try {
        await chrome.storage.sync.remove(['bidiFix', 'bidiMode']);
        await chrome.storage.local.remove(['bidiFix', 'bidiMode']);
      } catch(e) {}
      delete stored.bidiFix;
      delete stored.bidiMode;
    }
    const valid = {};
    for (const k of Object.keys(KTP_DEFAULTS)) {
      if (k in stored) valid[k] = stored[k];
    }
    currentSettings = { ...KTP_DEFAULTS, ...valid };
    if (!KTP_FONTS.find(f => f.id === currentSettings.fontId)) {
      currentSettings.fontId = KTP_DEFAULTS.fontId;
    }
    currentFont = getFontById(currentSettings.fontId);
  } catch (e) {
    currentSettings = { ...KTP_DEFAULTS };
    currentFont = getFontById(currentSettings.fontId);
  }
}

async function init() {
  await loadSettings();
  ensureFontLink(currentFont);
  updateDynamicStyle();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyToRoot(document.body);
      enhanceKickChatObserver();
    });
  } else {
    setTimeout(() => {
      applyToRoot(document.body);
      enhanceKickChatObserver();
    }, 300);
  }
  startObserver();
}

init();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'sync' && area !== 'local') return;
  let needsReload = false;
  let fontChanged = false;

  if (changes.enabled) {
    currentSettings.enabled = changes.enabled.newValue;
    needsReload = true;
  }
  if (changes.fontId) {
    currentSettings.fontId = changes.fontId.newValue;
    currentFont = getFontById(currentSettings.fontId);
    fontChanged = true;
    needsReload = true;
  }
  if (changes.fontWeight) {
    currentSettings.fontWeight = changes.fontWeight.newValue;
    needsReload = true;
  }
  if (changes.fontSize) {
    currentSettings.fontSize = changes.fontSize.newValue;
    needsReload = true;
  }
  if (changes.bidiFix || changes.bidiMode) {}

  if (fontChanged) ensureFontLink(currentFont);
  if (needsReload) {
    updateDynamicStyle();
    if (currentSettings.enabled) {
      if (changes.enabled && changes.enabled.newValue === true) {
        applyToRoot(document.body);
      } else {
        reApplyAll();
      }
    }
  }
});

// --- Observer بهینه + تمرکز ویژه روی چت کیک ---

let debounceTimer;
let idleCallbackId = null;

function scheduleApply(callback) {
  if (typeof requestIdleCallback !== 'undefined') {
    if (idleCallbackId) cancelIdleCallback(idleCallbackId);
    idleCallbackId = requestIdleCallback(() => callback(), { timeout: 700 });
  } else {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, 80);
  }
}

function enhanceKickChatObserver() {
  // پیدا کردن کانتینر چت کیک و observer اختصاصی با دقت بالا
  const chatContainers = document.querySelectorAll('#chatroom, [id*="chatroom" i], #channel-chat, [class*="chat-history" i], [class*="chat-container" i]');
  chatContainers.forEach(container => {
    if (container.dataset.ktpObserved) return;
    container.dataset.ktpObserved = '1';
    const chatObserver = new MutationObserver((mutations) => {
      if (!currentSettings.enabled || document.hidden) return;
      scheduleApply(() => {
        mutations.forEach(m => {
          m.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              applyToRoot(node);
            }
          });
        });
      });
    });
    chatObserver.observe(container, { childList: true, subtree: true, characterData: true });
    // اسکن اولیه چت
    applyToRoot(container);
  });

  // اگر چت هنوز لود نشده، هر 1 ثانیه چک کن (برای استریمر که چت دیر لود می‌شود)
  if (chatContainers.length === 0) {
    setTimeout(enhanceKickChatObserver, 1000);
  }
}

function startObserver() {
  const observer = new MutationObserver((mutations) => {
    if (!currentSettings.enabled) return;
    if (document.hidden) return;
    scheduleApply(() => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (shouldSkipElement(node)) continue;
            // اگر نود جدید چت است، مستقیم enhance
            if (isInsideKickChat(node) || (node.matches && node.matches('[class*="chat" i], #chatroom, #channel-chat'))) {
              enhanceKickChatObserver();
            }
            applyToRoot(node);
          } else if (node.nodeType === Node.TEXT_NODE && containsPersian(node.nodeValue)) {
            const p = node.parentElement;
            if (!p || shouldSkipElement(p)) continue;
            if (!p.classList.contains(PROCESSED_CLASS)) {
              const effectiveWeight = typeof getClosestWeight === 'function' ? getClosestWeight(currentFont, currentSettings.fontWeight) : currentSettings.fontWeight;
              p.classList.add(PROCESSED_CLASS);
              processedElements.add(p);
              p.style.setProperty('font-family', `'${currentFont.family}', Tahoma, sans-serif`, 'important');
              p.style.setProperty('font-weight', effectiveWeight, 'important');
              if (isInsideKickChat(p)) p.style.setProperty('line-height', '1.85', 'important');
            }
          }
        }
        if (m.type === 'characterData' && containsPersian(m.target.nodeValue)) {
          const p = m.target.parentElement;
          if (!p || shouldSkipElement(p)) continue;
          if (!p.classList.contains(PROCESSED_CLASS)) {
            const effectiveWeight = typeof getClosestWeight === 'function' ? getClosestWeight(currentFont, currentSettings.fontWeight) : currentSettings.fontWeight;
            p.classList.add(PROCESSED_CLASS);
            processedElements.add(p);
            p.style.setProperty('font-family', `'${currentFont.family}', Tahoma, sans-serif`, 'important');
            p.style.setProperty('font-weight', effectiveWeight, 'important');
            if (isInsideKickChat(p)) p.style.setProperty('line-height', '1.85', 'important');
          }
        }
      }
      // هر بار چت جدید آمد، کانتینر چت را دوباره شناسایی کن
      enhanceKickChatObserver();
    });
  });

  function waitForBody() {
    if (!document.body) return setTimeout(waitForBody, 100);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, characterDataOldValue: false });
    applyToRoot(document.body);
  }
  waitForBody();

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && currentSettings.enabled) {
      setTimeout(() => {
        applyToRoot(document.body);
        enhanceKickChatObserver();
      }, 400);
    }
  });
}

// هندل SPA کیک
window.addEventListener('popstate', () => setTimeout(() => { applyToRoot(document.body); enhanceKickChatObserver(); }, 600));
window.addEventListener('pushstate', () => setTimeout(() => { applyToRoot(document.body); enhanceKickChatObserver(); }, 600));
// برای سازگاری با یوتیوب قدیمی هم نگه می‌داریم
window.addEventListener('yt-navigate-finish', () => setTimeout(() => applyToRoot(document.body), 600));

// بک‌آپ هوشمند: چت استریمر هر 3 ثانیه چک شود (سریع‌تر از حالت عادی)
setInterval(() => {
  if (document.hidden || !currentSettings.enabled) return;
  applyToRoot(document.body);
  // هر 3 ثانیه چت را هم جداگانه چک کن
  enhanceKickChatObserver();
}, 3000);
