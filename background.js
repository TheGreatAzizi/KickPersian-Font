// KTP - Font | By TheAzizi | background.js | v2.2.0 پایدار

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    // پاکسازی تنظیمات باگ‌دار نسخه 2.1 (bidiFix)
    try {
      const old = await chrome.storage.sync.get(null);
      if ('bidiFix' in old || 'bidiMode' in old) {
        await chrome.storage.sync.remove(['bidiFix', 'bidiMode']);
        await chrome.storage.local.remove(['bidiFix', 'bidiMode']);
      }
      // اطمینان از وجود favorites
      if (!('favorites' in old)) {
        await chrome.storage.sync.set({ favorites: [] });
      }
    } catch(e) {}

    if (details.reason === 'install') {
      const defaults = {
        enabled: true,
        fontId: "vazirmatn",
        fontWeight: "400",
        fontSize: "100",
        favorites: []
      };
      await chrome.storage.sync.set(defaults);
    }
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_FONTS') {
    sendResponse({ ok: true });
  }
  return true;
});

