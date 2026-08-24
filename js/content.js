/* ==========================================================
   content.js — 内容渲染：作品卡片、电影海报、科技作品展示
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 工具：转义 HTML ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;',
        '"': '&quot;', "'": '&#39;'
      })[c];
    });
  }

  /* ---------- 1. 编程/科技兴趣区 ---------- */
  function renderProjects() {
    var container = document.getElementById('projectsGrid');
    if (!container) return;
    var data = (window.PROJECTS_DATA && Array.isArray(window.PROJECTS_DATA))
      ? window.PROJECTS_DATA : [];

    if (!data.length) {
      container.innerHTML =
        '<div style="grid-column:1/-1;padding:24px;text-align:center;color:var(--text-secondary);border:1px dashed var(--border-color);border-radius:var(--radius-md);">' +
        '暂无项目 · 在 <code>projects/data.js</code> 中添加后即可展示</div>';
      return;
    }

    container.innerHTML = data.map(function (p) {
      var tags = (p.tags || []).map(function (t) {
        return '<span class="tag">' + escapeHtml(t) + '</span>';
      }).join('');

      var codeBlock = '';
      if (p.code) {
        codeBlock =
          '<div class="project-code-preview"><pre>' + escapeHtml(String(p.code)) + '</pre></div>';
      }

      var linkHtml = '';
      if (p.link && p.link !== '#') {
        linkHtml =
          '<a class="project-link" href="' + escapeHtml(p.link) + '" target="_blank" rel="noopener noreferrer">查看 →</a>';
      }

      return (
        '<article class="project-card">' +
          '<div class="project-head">' +
            '<h4 class="project-name">' + escapeHtml(p.name || '未命名项目') + '</h4>' +
            linkHtml +
          '</div>' +
          '<p class="project-desc">' + escapeHtml(p.description || '') + '</p>' +
          (tags ? '<div class="project-tags">' + tags + '</div>' : '') +
          codeBlock +
        '</article>'
      );
    }).join('');
  }

  /* ---------- 2. 电影海报墙 ---------- */
  // 默认电影数据（诺兰 + 经典科幻/剧情）
  var DEFAULT_MOVIES = [
    { title: '盗梦空间', en: 'Inception', year: 2010, review: '多层梦境嵌套的天花板，陀螺停下的那刻是所有人的意难平。', poster: 'assets/posters/official-inception.jpg', fallback: 'assets/posters/inception.jpg' },
    { title: '星际穿越', en: 'Interstellar', year: 2014, review: '爱是唯一能穿越时间和空间的力量，硬核科幻外壳下的温柔内核。', poster: 'assets/posters/official-interstellar.jpg', fallback: 'assets/posters/interstellar.jpg' },
    { title: '记忆碎片', en: 'Memento', year: 2000, review: '倒叙正叙交织的叙事鬼才，我是谁？我要找谁？谁在骗我？', poster: 'assets/posters/official-memento.jpg', fallback: 'assets/posters/memento.jpg' },
    { title: '致命魔术', en: 'The Prestige', year: 2006, review: '每个魔术都有三个步骤：以虚代实、偷天换日、化腐朽为神奇。', poster: 'assets/posters/official-prestige.jpg', fallback: 'assets/posters/prestige.jpg' },
    { title: '蝙蝠侠：黑暗骑士', en: 'The Dark Knight', year: 2008, review: '希斯·莱杰之后再无小丑，混乱是公平的阶梯。', poster: 'assets/posters/official-dark-knight.jpg', fallback: 'assets/posters/dark-knight.jpg' },
    { title: '肖申克的救赎', en: 'The Shawshank Redemption', year: 1994, review: '希望是美好的，也许是人间至善，而美好的事物永不消逝。', poster: 'assets/posters/official-shawshank.jpg', fallback: 'assets/posters/shawshank.jpg' },
    { title: '楚门的世界', en: 'The Truman Show', year: 1998, review: '假如再也碰不到你，祝你早安、午安、晚安。', poster: 'assets/posters/official-truman.jpg', fallback: 'assets/posters/truman.jpg' },
    { title: '海上钢琴师', en: 'The Legend of 1900', year: 1998, review: '钢琴有始有终，88个键，却能弹出无限的音乐。', poster: 'assets/posters/official-legend-1900.jpg', fallback: 'assets/posters/legend-1900.jpg' },
    { title: '教父', en: 'The Godfather', year: 1972, review: '永远不要让家族外的人知道你的想法。', poster: 'assets/posters/official-godfather.jpg', fallback: 'assets/posters/godfather.jpg' }
  ];

  function renderPosters() {
    var container = document.getElementById('postersGrid');
    if (!container) return;
    // 允许用户在全局覆盖电影列表
    var data = (window.MOVIES_DATA && Array.isArray(window.MOVIES_DATA) && window.MOVIES_DATA.length)
      ? window.MOVIES_DATA : DEFAULT_MOVIES;

    container.innerHTML = data.map(function (m, idx) {
      var useImg = m.poster && (typeof m.poster === 'string') && m.poster.length > 0;
      var fb = (m.fallback && (typeof m.fallback === 'string')) ? ' data-fallback="' + escapeHtml(m.fallback) + '"' : '';
      var onerror = fb
        ? ("onerror=\"if(this.dataset.fallback && this.dataset.retried!=='1'){this.dataset.retried='1';this.src=this.dataset.fallback;}else{this.style.display='none';this.nextElementSibling.style.display='flex';}\"")
        : ("onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex';\"");
      var inner = useImg
        ? '<img class="poster-img" src="' + escapeHtml(m.poster) + '" alt="' + escapeHtml(m.title) + '" loading="lazy" ' + fb + ' ' + onerror + ' />' +
          '<div class="poster-placeholder" style="display:none;">' + escapeHtml(m.title) + '</div>'
        : '<div class="poster-placeholder">' + escapeHtml(m.title || ('电影 ' + (idx + 1))) + '</div>';

      var title = m.title || '未知';
      var sub = m.year ? '（' + m.year + '）' : '';
      var bilibiliLink = (m.link && typeof m.link === 'string')
        ? m.link
        : ('https://search.bilibili.com/all?keyword=' + encodeURIComponent(title) + '&from_source=web_search');
      var coverLink = '<a class="poster-card-link" href="' + escapeHtml(bilibiliLink) + '" target="_blank" rel="noopener noreferrer" aria-label="在Bilibili搜索《' + escapeHtml(title) + '》"></a>';
      return (
        '<div class="poster-card" title="' + escapeHtml(title) + '">' +
          coverLink +
          inner +
          '<div class="poster-overlay">' +
            '<div class="poster-title">' + escapeHtml(title) + '<span style="color:var(--text-secondary);font-weight:400;font-size:0.8em;">' + sub + '</span></div>' +
            '<div class="poster-review">' + escapeHtml(m.review || '') + '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------- 3. 科技作品展示区 ---------- */
  function detectPrismLang(userLang) {
    var map = {
      'py': 'python', 'python': 'python',
      'c': 'c', 'h': 'c',
      'cpp': 'cpp', 'cc': 'cpp', 'cxx': 'cpp', 'hpp': 'cpp', 'c++': 'cpp',
      'js': 'javascript', 'javascript': 'javascript', 'es6': 'javascript', 'mjs': 'javascript',
      'ts': 'typescript', 'typescript': 'typescript',
      'html': 'markup', 'htm': 'markup', 'xml': 'markup',
      'css': 'css', 'scss': 'scss', 'sass': 'sass',
      'java': 'java',
      'ino': 'arduino', 'arduino': 'arduino',
      'json': 'json',
      'sh': 'bash', 'bash': 'bash', 'shell': 'bash',
      'md': 'markdown', 'markdown': 'markdown',
      'sql': 'sql',
      'go': 'go', 'rs': 'rust', 'rust': 'rust',
      'rb': 'ruby', 'php': 'php', 'cs': 'csharp', 'kt': 'kotlin'
    };
    if (!userLang) return 'javascript';
    var l = String(userLang).toLowerCase().trim();
    return map[l] || (window.Prism && window.Prism.languages && window.Prism.languages[l] ? l : 'javascript');
  }

  function renderShowcase() {
    var navEl = document.getElementById('showcaseNav');
    var detailEl = document.getElementById('showcaseDetail');
    if (!navEl || !detailEl) return;

    var data = (window.SHOWCASE_DATA && Array.isArray(window.SHOWCASE_DATA))
      ? window.SHOWCASE_DATA : [];

    // 空状态
    if (!data.length) {
      navEl.innerHTML = '<div style="padding:16px;color:var(--text-secondary);text-align:center;font-size:0.9rem;">暂无作品</div>';
      return;
    }

    // 渲染导航
    navEl.innerHTML = data.map(function (s, idx) {
      return (
        '<div class="showcase-item' + (idx === 0 ? ' active' : '') + '" data-id="' + escapeHtml(s.id || String(idx)) + '">' +
          '<span class="showcase-item-icon">' + escapeHtml(s.icon || '📁') + '</span>' +
          '<span class="showcase-item-name">' + escapeHtml(s.name || '未命名') + '</span>' +
        '</div>'
      );
    }).join('');

    // 渲染单个详情
    function renderDetail(item) {
      if (!item) {
        detailEl.innerHTML =
          '<div class="showcase-placeholder">' +
            '<div class="placeholder-icon">📂</div>' +
            '<h3>选择左侧项目查看详情</h3>' +
            '<p>可在 <code>showcase/data.js</code> 中添加作品，对应文件包放入 <code>showcase/bundles/</code> 目录</p>' +
          '</div>';
        return;
      }

      var tags = (item.tags || []).map(function (t) {
        return '<span class="tag">' + escapeHtml(t) + '</span>';
      }).join('');

      var bundleBlock = '';
      if (item.bundleUrl) {
        var bundleUrl = String(item.bundleUrl);
        var fileList = (Array.isArray(item.files) ? item.files : []).map(function (f) {
          var isDir = /\/$/.test(f.name);
          var icon = isDir ? '📁' : fileIconByExt(f.name);
          return (
            '<div class="bundle-file-item">' +
              '<span class="bundle-file-icon">' + icon + '</span>' +
              '<span class="bundle-file-name">' + escapeHtml(f.name) + '</span>' +
              (f.size ? '<span class="bundle-file-size">' + escapeHtml(String(f.size)) + '</span>' : '') +
            '</div>'
          );
        }).join('');

        var btnRow = '';
        btnRow +=
          '<a class="bundle-btn bundle-btn--primary" href="' + escapeHtml(bundleUrl) + '" download>' +
            '<svg class="bundle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>' +
            '下载完整文件包' +
          '</a>';
        if (item.demoUrl && String(item.demoUrl).trim()) {
          btnRow +=
            '<a class="bundle-btn bundle-btn--ghost" href="' + escapeHtml(String(item.demoUrl)) + '" target="_blank" rel="noopener noreferrer">' +
              '<svg class="bundle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>' +
              '在线预览' +
            '</a>';
        }

        bundleBlock =
          '<div class="showcase-bundle-card">' +
            '<div class="bundle-header">' +
              '<div class="bundle-header-left">' +
                '<span class="bundle-header-icon">📦</span>' +
                '<div>' +
                  '<div class="bundle-header-title">完整项目文件包</div>' +
                  '<div class="bundle-header-sub">' + escapeHtml(String(item.bundleSize || '压缩包体积未知')) + ' · 双击运行 index.html 即可体验</div>' +
                '</div>' +
              '</div>' +
              '<div class="bundle-btns">' + btnRow + '</div>' +
            '</div>' +
            (fileList ? (
              '<div class="bundle-file-list">' +
                '<div class="bundle-file-title">项目文件清单</div>' +
                fileList +
              '</div>'
            ) : '') +
          '</div>';
      } else {
        bundleBlock =
          '<div class="showcase-bundle-card showcase-bundle-card--empty">' +
            '<div class="bundle-header">' +
              '<div class="bundle-header-left">' +
                '<span class="bundle-header-icon">📦</span>' +
                '<div>' +
                  '<div class="bundle-header-title">文件包待上传</div>' +
                  '<div class="bundle-header-sub">将作品打包为 zip 放入 <code>showcase/bundles/' + escapeHtml(String(item.id || 'project')) + '.zip</code> 后，用户即可点击下载</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>';
      }

      detailEl.innerHTML =
        '<h3 class="showcase-title">' +
          '<span style="font-size:1.2em;">' + escapeHtml(item.icon || '📁') + '</span>' +
          escapeHtml(item.name || '未命名作品') +
        '</h3>' +
        (tags ? '<div class="showcase-tags">' + tags + '</div>' : '') +
        (item.description ? '<div class="showcase-desc">' + escapeHtml(item.description) + '</div>' : '') +
        bundleBlock;
    }

    /** 按文件扩展名返回对应图标 emoji */
    function fileIconByExt(name) {
      if (!name) return '📄';
      var n = String(name).toLowerCase();
      if (/\/$/.test(n)) return '📁';
      if (/\.(html?|xml|xhtml)$/.test(n)) return '🌐';
      if (/\.(css|scss|sass|less)$/.test(n)) return '🎨';
      if (/\.(js|jsx|mjs|ts|tsx)$/.test(n)) return '📜';
      if (/\.(py|pyw|ipynb)$/.test(n)) return '🐍';
      if (/\.(jpg|jpeg|png|gif|webp|svg|ico|bmp)$/.test(n)) return '🖼️';
      if (/\.(mp3|wav|ogg|flac|m4a|aac)$/.test(n)) return '🎵';
      if (/\.(mp4|webm|mov|avi|mkv)$/.test(n)) return '🎬';
      if (/\.(zip|rar|7z|tar|gz)$/.test(n)) return '🗜️';
      if (/\.(md|markdown|txt|rtf)$/.test(n)) return '📝';
      if (/\.(json|ya?ml|toml|cfg|ini)$/.test(n)) return '⚙️';
      return '📄';
    }

    // 默认选中第一个
    renderDetail(data[0]);

    // 导航点击切换
    navEl.querySelectorAll('.showcase-item').forEach(function (el) {
      el.addEventListener('click', function () {
        var id = el.getAttribute('data-id');
        var item = data.find(function (s) { return (s.id || String(data.indexOf(s))) === id; });
        navEl.querySelectorAll('.showcase-item').forEach(function (x) { x.classList.remove('active'); });
        el.classList.add('active');
        renderDetail(item);
      });
    });
  }

  /* ---------- 对外暴露 ---------- */
  window.SiteContent = {
    renderAll: function () {
      renderProjects();
      renderPosters();
      renderShowcase();
    },
    renderProjects: renderProjects,
    renderPosters: renderPosters,
    renderShowcase: renderShowcase
  };

  /* ---------- 微信卡片可访问性：键盘 Enter/Space 触发点击（打开二维码弹窗） ---------- */
  (function initWechatKeyboard() {
    function attach() {
      var wb = document.getElementById('wechatBtn');
      if (!wb || wb.tagName === 'BUTTON' || wb._wechatKbBound) return;
      wb._wechatKbBound = true;
      wb.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          wb.click();
        }
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attach);
    } else {
      attach();
    }
  })();
})();
