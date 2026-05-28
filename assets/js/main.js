/* AI Security Layers — Interactive JS */
(function () {
  'use strict';

  // ── Scroll progress bar ───────────────────────────────────────
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  // ── Active layer tracking (Intersection Observer) ─────────────
  const layerSections = document.querySelectorAll('.layer-section');
  const sidebarLinks  = document.querySelectorAll('.sidebar-layer-link');
  const navChips      = document.querySelectorAll('.nav-layer-chip');

  function setActiveLayer(id) {
    sidebarLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.layer === id);
      if (l.dataset.layer === id) {
        const color = getComputedStyle(l).getPropertyValue('--layer-color').trim();
        l.style.borderLeftColor = color;
      } else {
        l.style.borderLeftColor = 'transparent';
      }
    });
    navChips.forEach(c => {
      const isActive = c.dataset.layer === id;
      c.classList.toggle('active', isActive);
      if (isActive) {
        const dot = c.querySelector('.chip-dot');
        c.style.color = dot ? dot.style.background : '';
        c.style.borderColor = dot ? dot.style.background : '';
        c.style.background = 'rgba(255,255,255,0.05)';
      } else {
        c.style.color = '';
        c.style.borderColor = '';
        c.style.background = '';
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLayer(entry.target.dataset.layer);
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    layerSections.forEach(s => observer.observe(s));
  }

  // ── Tab switching ─────────────────────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const layer   = this.dataset.layer;
      const tabName = this.dataset.tab;
      const wrapper = this.closest('.tab-content-wrapper') || document.querySelector(`#layer-${layer}`);

      // Deactivate all tabs in this layer
      const allBtns = this.closest('.tab-nav').querySelectorAll('.tab-btn');
      allBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      // Activate clicked tab button
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      // Deactivate all panels for this layer
      const section = document.getElementById('layer-' + layer);
      if (section) {
        section.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const target = section.querySelector('#' + layer + '-' + tabName);
        if (target) target.classList.add('active');
      }
    });
  });

  // ── Search ────────────────────────────────────────────────────
  const searchToggle  = document.getElementById('searchToggle');
  const searchClose   = document.getElementById('searchClose');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput   = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  function openSearch() {
    searchOverlay.classList.add('open');
    setTimeout(() => searchInput && searchInput.focus(), 100);
  }

  function closeSearch() {
    searchOverlay.classList.remove('open');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  }

  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });

  // Search index — built from all risk titles and example titles visible in DOM
  const searchIndex = [];
  document.querySelectorAll('.layer-section').forEach(section => {
    const layerId   = section.id.replace('layer-', '');
    const layerName = section.querySelector('.layer-title') ? section.querySelector('.layer-title').textContent : layerId;
    const color     = section.querySelector('.layer-header-block') ?
      getComputedStyle(section.querySelector('.layer-header-block')).getPropertyValue('--layer-color').trim() : '#00d4ff';

    section.querySelectorAll('.risk-title').forEach(el => {
      searchIndex.push({ type: 'Risk', layer: layerName, layerId, color, title: el.textContent.trim(), anchor: '#' + section.id });
    });
    section.querySelectorAll('.example-title').forEach(el => {
      searchIndex.push({ type: 'Example', layer: layerName, layerId, color, title: el.textContent.trim(), anchor: '#' + section.id });
    });
    section.querySelectorAll('.mitigation-title').forEach(el => {
      searchIndex.push({ type: 'Mitigation', layer: layerName, layerId, color, title: el.textContent.trim(), anchor: '#' + section.id });
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const q = this.value.toLowerCase().trim();
      if (!q) { searchResults.innerHTML = ''; return; }
      const hits = searchIndex.filter(item =>
        item.title.toLowerCase().includes(q) || item.layer.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
      ).slice(0, 12);

      if (!hits.length) {
        searchResults.innerHTML = '<div class="search-result-item"><div class="result-title" style="color:var(--text-muted)">No results found</div></div>';
        return;
      }

      searchResults.innerHTML = hits.map(item =>
        `<div class="search-result-item" onclick="location.hash='${item.anchor.replace('#','')}'">
          <div class="result-layer" style="color:${item.color}">${item.type} · ${item.layer}</div>
          <div class="result-title">${item.title}</div>
        </div>`
      ).join('');

      searchResults.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', closeSearch);
      });
    });
  }

  // ── Mobile menu ───────────────────────────────────────────────
  const hamburger   = document.getElementById('hamburgerBtn');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileMenuClose');

  if (hamburger) hamburger.addEventListener('click', () => mobileMenu && mobileMenu.classList.add('open'));
  if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu && mobileMenu.classList.remove('open'));

  window.closeMobileMenu = function () {
    if (mobileMenu) mobileMenu.classList.remove('open');
  };

  // Close overlays when clicking outside
  [searchOverlay, mobileMenu].forEach(overlay => {
    if (!overlay) return;
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  // ── Smooth nav chip scroll ────────────────────────────────────
  document.querySelectorAll('.nav-layer-chip').forEach(chip => {
    chip.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Hero layer stack animations ───────────────────────────────
  const stackItems = document.querySelectorAll('.layer-stack-item');
  stackItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      item.style.opacity = '0.85';
      item.style.transform = 'translateY(0)';
    }, 100 + i * 60);
  });

})();
