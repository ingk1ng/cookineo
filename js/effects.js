/* ==========================================================
   effects.js — 动效：打字机、滚动渐入、波纹、毛玻璃导航等
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 1. 打字机效果 ---------- */
  function initTypewriter() {
    var el = document.getElementById('typewriter');
    if (!el) return;
    var text = el.getAttribute('data-text') ||
      '填志愿的时候一眼相中这个专业——毕竟从 2G 到 5G，把全世界人串在一张网里，想想就很酷啊。高三毕业没跑去旅游疯玩，天天蹲家翻出我爸当年的旧工程书瞎看，自学编程对着教程敲代码调 bug 才跑通。平时不爱凑热闹，就爱蹲数码论坛扒基带参数，闲了打打模拟飞行，开学想找学长带带我进实验室玩，也想找个能一起泡图书馆刷习题的饭搭子。';
    el.setAttribute('data-text', text);
    el.textContent = '';
    var i = 0;
    var len = text.length;
    // 打字速度：中文稍慢、标点稍停
    var getDelay = function (ch) {
      if (/[，。！？；：、]/.test(ch)) return 160;
      if (/[——\n]/.test(ch)) return 200;
      return 42;
    };
    var tick = function () {
      if (i < len) {
        var ch = text.charAt(i);
        el.textContent += ch;
        i++;
        setTimeout(tick, getDelay(ch));
      }
    };
    // 等 Hero 视觉稍作呈现后再开始
    setTimeout(tick, 600);
  }

  /* ---------- 2. 滚动渐入（IntersectionObserver） ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      // 降级：全部直接显示
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 3. 导航栏：滚动毛玻璃 + 锚点高亮 ---------- */
  function initNavbar() {
    var nav = document.getElementById('navbar');
    if (!nav) return;
    var links = nav.querySelectorAll('.nav-links a[href^="#"]');
    var sections = Array.from(links).map(function (a) {
      return document.querySelector(a.getAttribute('href'));
    }).filter(Boolean);

    var onScroll = function () {
      var y = window.scrollY || window.pageYOffset;
      if (y > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');

      // 锚点高亮
      if (!sections.length) return;
      var current = null;
      var viewMid = window.innerHeight * 0.35;
      for (var i = 0; i < sections.length; i++) {
        var s = sections[i];
        var rect = s.getBoundingClientRect();
        if (rect.top <= viewMid && rect.bottom >= viewMid) current = s;
      }
      if (!current && sections.length && window.scrollY < 100) current = sections[0];
      links.forEach(function (a) { a.style.color = ''; });
      if (current) {
        var activeLink = nav.querySelector('.nav-links a[href="#' + current.id + '"]');
        if (activeLink) activeLink.style.color = 'var(--accent-blue)';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 4. 移动端汉堡菜单 ---------- */
  function initNavToggle() {
    var btn = document.getElementById('navToggle');
    var list = document.getElementById('navLinks');
    if (!btn || !list) return;
    btn.addEventListener('click', function () {
      btn.classList.toggle('active');
      list.classList.toggle('open');
    });
    list.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        btn.classList.remove('active');
        list.classList.remove('open');
      });
    });
  }

  /* ---------- 5. 返回顶部按钮 ---------- */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    var toggle = function () {
      if ((window.scrollY || window.pageYOffset) > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    };
    window.addEventListener('scroll', toggle, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggle();
  }

  /* ---------- 6. 微信弹窗 ---------- */
  function initWechatModal() {
    var btn = document.getElementById('wechatBtn');
    var modal = document.getElementById('wechatModal');
    if (!btn || !modal) return;
    var open = function () {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    var close = function () {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    btn.addEventListener('click', open);
    modal.querySelectorAll('[data-close="1"]').forEach(function (el) {
      el.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) close();
    });
  }

  /* ---------- 对外暴露初始化入口 ---------- */
  window.SiteEffects = {
    initAll: function () {
      initTypewriter();
      initReveal();
      initNavbar();
      initNavToggle();
      initBackToTop();
      initWechatModal();
    }
  };
})();
