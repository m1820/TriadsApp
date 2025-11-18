document.addEventListener('DOMContentLoaded', () => {
  const pages = {
    home: document.getElementById('home'),
    detail: document.getElementById('shape-detail'),
    gallery: document.getElementById('gallery')
  };
  const menuList = document.getElementById('menu-list');
  const submenuList = document.getElementById('submenu-list');
  const imageGrid = document.getElementById('image-grid');
  const shapeTitle = document.getElementById('shape-title');
  const goodforText = document.getElementById('goodfor-text');
  const galleryTitle = document.getElementById('gallery-title');
  const navTitle = document.getElementById('nav-title');
  const navLogo = document.getElementById('nav-logo');
  const homeLink = document.getElementById('home-link');
  const backBtn = document.getElementById('back-btn');
  const fs = document.getElementById('fullscreen');
  const fsImg = document.getElementById('fs-image');
  const fsOverlay = document.getElementById('fs-overlay-controls');
  const fsCounter = document.getElementById('fs-counter');
  const fsCaption = document.getElementById('fs-caption');
  const menuToggle = document.getElementById('menu-toggle');
  const menuDropdown = document.getElementById('menu-dropdown');
  const menuItems = document.getElementById('menu-items');
  const notice = document.getElementById('coming-soon-notice');
  const dismissBtn = document.getElementById('dismiss-notice');

  // Install button + lightbox
  const installBtn = document.getElementById('install-instructions-btn');
  const installLightbox = document.getElementById('install-lightbox');
  const installBtnContainer = document.getElementById('install-instructions-container'); // ← FIXED

  installBtn.onclick = () => installLightbox.classList.add('active');
  installLightbox.onclick = () => installLightbox.classList.remove('active');

  // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
  // THESE MUST BE DECLARED EARLY — FIXED THE WHOLE APP
  let currentImages = [], currentIdx = 0;
  let currentShape = null, currentGallery = '';
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  // Dismiss notice
  if (localStorage.getItem('noticeDismissed') === 'true') notice.classList.add('hidden');
  dismissBtn.onclick = () => {
    notice.classList.add('hidden');
    localStorage.setItem('noticeDismissed', 'true');
  };

  function renderHome() {
    menuList.innerHTML = '';
    SHAPES_DATA.forEach((shape, i) => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      const thumb = shape.submenus[0].images[0];
      card.innerHTML = `<img src="${thumb}" alt=""><p>${shape.name}</p>`;
      card.onclick = () => showDetail(i);
      menuList.appendChild(card);
    });
  }

  async function showDetail(idx) {
    const shape = SHAPES_DATA[idx];
    currentShape = shape;
    shapeTitle.textContent = shape.name;
    goodforText.textContent = '…';
    submenuList.innerHTML = '';
    const txt = await loadGoodFor(shape.name);
    goodforText.textContent = txt.trim() || 'No description';
    shape.submenus.forEach(sub => {
      const card = document.createElement('div');
      card.className = 'submenu-card';
      card.textContent = sub.name;
      card.onclick = () => showGallery(sub.name, sub.images);
      submenuList.appendChild(card);
    });
    switchPage('detail');
  }

  function showGallery(title, imgs) {
    galleryTitle.textContent = title;
    currentGallery = title;
    imageGrid.innerHTML = '';
    currentImages = imgs;
    imgs.forEach((src, i) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;';
      const img = document.createElement('img');
      img.src = src; img.className = 'img-thumb'; img.onclick = () => openFS(i);
      const cleanName = src.split('/').pop().replace('.png','').replace('-sharp','#').replace(/\s+/g,' ');
      const caption = document.createElement('div');
      caption.className = 'img-caption'; caption.textContent = cleanName;
      wrapper.appendChild(img); wrapper.appendChild(caption);
      imageGrid.appendChild(wrapper);
    });

    const youtubeContainer = document.getElementById('youtube-practice-container');
    const youtubeLink = document.getElementById('youtube-practice-link');
    youtubeContainer.classList.add('hidden');
    if (title.includes('Example Song in E') || title.includes('Example song in E')) {
      youtubeLink.href = 'https://www.youtube.com/watch?v=u8bsQmi3MMU';
      youtubeContainer.classList.remove('hidden');
    } else if (title.includes('Example Song in G') || title.includes('Example song in G')) {
      youtubeLink.href = 'https://www.youtube.com/watch?v=Lpx4Mrj6dyo';
      youtubeContainer.classList.remove('hidden');
    }
    switchPage('gallery');
  }

  function openFS(i) {
    currentIdx = i;
    updateFS();
    fs.classList.remove('hidden');
    hideControls();

    fs.onclick = (e) => {
      if (e.target.closest('button') || e.target.closest('#fs-overlay-controls')) return;
      if (fsOverlay.classList.contains('active')) hideControls();
      else showControls();
    };
  }

  function showControls() {
    fsOverlay.classList.add('active');
    clearTimeout(window.fsTimeout);
    window.fsTimeout = setTimeout(hideControls, 4000);
  }

  function hideControls() {
    fsOverlay.classList.remove('active');
  }

  function updateFS() {
    fsImg.src = currentImages[currentIdx];
    fsCounter.textContent = `${currentIdx + 1} / ${currentImages.length}`;
    const cleanName = currentImages[currentIdx].split('/').pop()
      .replace('.png', '').replace('-sharp', '#').replace(/\s+/g, ' ');
    fsCaption.textContent = cleanName;
    hideControls();
  }

  document.getElementById('close-fs').onclick = e => { e.stopPropagation(); fs.classList.add('hidden'); };
  document.getElementById('prev-img').onclick = e => { e.stopPropagation(); currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length; updateFS(); };
  document.getElementById('next-img').onclick = e => { e.stopPropagation(); currentIdx = (currentIdx + 1) % currentImages.length; updateFS(); };

  // Swipe
  let startX = 0;
  fs.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  fs.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? document.getElementById('next-img').click() : document.getElementById('prev-img').click();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!fs.classList.contains('hidden')) {
      if (e.key === 'Escape') { e.preventDefault(); document.getElementById('close-fs').click(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); document.getElementById('prev-img').click(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); document.getElementById('next-img').click(); }
    }
  });

  backBtn.onclick = () => {
    if (pages.gallery.classList.contains('active')) switchPage('detail');
    else switchPage('home');
  };

  function switchPage(name) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[name].classList.add('active');
    fs.classList.add('hidden');

    navLogo.style.display = 'block';

    if (name === 'home') navTitle.textContent = '';
    else navTitle.textContent = name === 'detail' ? currentShape?.name : currentGallery;

    backBtn.style.display = name === 'home' ? 'none' : 'flex';

    // Install button visibility
    if (installBtnContainer) {
      installBtnContainer.classList.toggle('hidden', name !== 'home');
    }

    document.getElementById('attribution').style.display = name === 'home' ? 'block' : 'none';
  }

  homeLink.addEventListener('click', e => {
    e.preventDefault();
    switchPage('home');
    renderHome();
  });

  function renderMenuDropdown() {
    menuItems.innerHTML = '';
    SHAPES_DATA.forEach((shape, i) => {
      const item = document.createElement('div');
      item.className = 'menu-dropdown-item';
      item.textContent = shape.name;
      item.onclick = e => { e.stopPropagation(); showDetail(i); menuDropdown.classList.remove('active'); };
      menuItems.appendChild(item);
    });
    const about = document.createElement('div');
    about.className = 'menu-dropdown-item';
    about.textContent = 'About Triads';
    about.onclick = e => { e.stopPropagation(); showAbout(); menuDropdown.classList.remove('active'); };
    menuItems.appendChild(about);
  }

function showAbout() {
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:2000;display:flex;align-items:center;justify-content:center;padding:20px;';
  modal.innerHTML = `
    <div style="background:#111;color:#f0f0f0;max-width:420px;width:100%;border-radius:20px;padding:32px 28px;box-shadow:0 20px 50px rgba(0,0,0,0.7);position:relative;text-align:center;">
      <button onclick="this.closest('div').parentNode.remove()" style="position:absolute;top:12px;right:16px;background:none;border:none;color:#888;font-size:32px;cursor:pointer;line-height:1;">×</button>
      
      <h2 style="font-size:24px;color:#0a84ff;margin:0 0 16px;">Triads</h2>
      <p style="color:#aaa;font-size:15px;line-height:1.5;">Master rhythm guitar & the Nashville Number System instantly.</p>
      
      <div style="margin:24px 0;font-size:15px;color:#ddd;line-height:1.6;">
        <p>Learn <strong>triad patterns once</strong> — play in <strong>any key</strong>, <strong>any song</strong>, forever.</p>
        <p>No more memorizing hundreds of chords. Just learn a movable shape, know the root, and you’re ready.</p>
        <p>Perfect for worship leaders, songwriters, and rhythm players.</p>
      </div>

      <!-- SOCIAL ICONS -->
      <div style="margin:32px 0 20px;display:flex;justify-content:center;gap:32px;align-items:center;">
        <a href="https://x.com/triadsapp" target="_blank" aria-label="X">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://instagram.com/triadsapp" target="_blank" aria-label="Instagram">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E4405F" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><line x1="16.5" y1="7.5" x2="16.5" y2="7.51"/></svg>
        </a>
        <a href="https://tiktok.com/@triadsapp" target="_blank" aria-label="TikTok">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M19.6 5.92a4.83 4.83 0 0 1-3.77-4.25V1.25h-3.45v13.67a2.89 2.89 0 1 1-5.2 0 2.89 2.89 0 0 1 2.31-4.64v-3.9a6.68 6.68 0 0 0-4.67 6.58 6.77 6.77 0 0 0 6.77 6.77c3.79 0 6.77-3.07 6.77-6.77V7.74a9.77 9.77 0 0 0 5.65 1.8V6.05a6.33 6.33 0 0 1-4.38-1.13z" fill="#010101"/>
            <path d="M12.35 1.25v13.67a2.89 2.89 0 1 0 5.2 0V7.74a4.83 4.83 0 0 0 3.77 4.25v3.49a9.77 9.77 0 0 1-5.65-1.8v5.33c0 3.7-2.98 6.77-6.77 6.77a6.77 6.77 0 0 1-6.77-6.77 6.68 6.68 0 0 1 4.67-6.58v3.9a2.89 2.89 0 0 0-2.31 4.64 2.89 2.89 0 0 0 5.2-1.74V1.25h3.45z" fill="#FF0050"/>
            <path d="M15.83 1.25v5.25a4.83 4.83 0 0 0 3.77 4.25v3.49a9.77 9.77 0 0 1-5.65-1.8v5.33c0 3.7-2.98 6.77-6.77 6.77a6.77 6.77 0 0 1-6.77-6.77 6.68 6.68 0 0 1 4.67-6.58v3.9a2.89 2.89 0 0 0-2.31 4.64 2.89 2.89 0 0 0 5.2-1.74V1.25h3.45z" fill="#00F2EA"/>
          </svg>
        </a>
        <a href="https://facebook.com/triadsapp" target="_blank" aria-label="Facebook">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.469h3.047v-2.637c0-3.028 1.797-4.705 4.533-4.705 1.312 0 2.686.235 2.686.235v2.953h-1.512c-1.491 0-1.956.927-1.956 1.875v2.25h3.328l-.532 3.469h-2.796v8.385c5.737-.9 10.125-5.86 10.125-11.854z"/></svg>
        </a>
      </div>

      <!-- CONTACT EMAIL — SPAM-PROOF -->
      <p style="margin:20px 0 8px;color:#aaa;font-size:14px;">Questions? Reach out:</p>
      <a href="#" onclick="event.preventDefault(); window.location.href='mailto:' + 'info' + '@' + 'triadsapp' + '.com'" 
         style="color:#0a84ff;font-size:18px;font-weight:600;text-decoration:none;">
        info@triadsapp.com
      </a>

      <!-- BUY ME A COFFEE BUTTON -->
      <div style="margin:28px 0;">
        <a href="https://buymeacoffee.com/m1820" target="_blank" style="background:#FF813F;color:#000;padding:14px 28px;border-radius:12px;font-weight:700;font-size:16px;text-decoration:none;display:inline-block;box-shadow:0 4px 12px rgba(255,129,63,0.4);">
          ☕ Buy me a Coffee
        </a>
      </div>

      <!-- FOOTER CONTENT -->
      <div style="margin:36px 0 0;padding-top:24px;border-top:1px solid #333;color:#888;font-size:13px;line-height:1.8;">
        TriadsApp is Open Source<br>
        Built with ❤️ for the guitar community<br><br>
        <a href="https://github.com/m1820/TriadsApp" target="_blank" style="color:#0a84ff;text-decoration:none;">View on GitHub →</a><br><br>
        <a href="https://github.com/sponsors/m1820" target="_blank" style="color:#ff6b6b;text-decoration:none;font-weight:600;">❤️ Sponsor this project on GitHub</a><br><br>
        Diagrams by <a href="https://zeitbach.com/projects/fretboard-diagram-creator/" target="_blank" style="color:#0a84ff;text-decoration:none;">Fretboard Diagram Creator</a>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
}

  menuToggle.onclick = e => { e.stopPropagation(); menuDropdown.classList.toggle('active'); };
  document.addEventListener('click', () => menuDropdown.classList.remove('active'));
  menuDropdown.onclick = e => e.stopPropagation();

  renderHome();
  renderMenuDropdown();
  switchPage('home');
});