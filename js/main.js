/* ==========================================================
   main.js — 主入口
   ========================================================== */
(function () {
  'use strict';

  function boot() {
    // 1. 先渲染内容（需要尽早拿到 DOM 元素尺寸）
    if (window.SiteContent && typeof window.SiteContent.renderAll === 'function') {
      try { window.SiteContent.renderAll(); } catch (e) { console.error('[content]', e); }
    }
    // 2. 再绑定动效
    if (window.SiteEffects && typeof window.SiteEffects.initAll === 'function') {
      try { window.SiteEffects.initAll(); } catch (e) { console.error('[effects]', e); }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
