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
  const fsOverlay = document.getElementById('fs-overlay-controls'); // ← new
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

installBtn.onclick = () => installLightbox.classList.add('active');
installLightbox.onclick = () => installLightbox.classList.remove('active');

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

    // YouTube button
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

  // ==================== FULLSCREEN LOGIC (UPDATED) ====================

  function openFS(i) {
    currentIdx = i;
    updateFS();
    fs.classList.remove('hidden');
    hideControls();

    // Tap anywhere (except buttons) toggles controls
    fs.onclick = (e) => {
      if (e.target.closest('button') || e.target.closest('#fs-overlay-controls')) return;
      if (fsOverlay.classList.contains('active')) {
        hideControls();
      } else {
        showControls();
      }
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
      .replace('.png', '')
      .replace('-sharp', '#')
      .replace(/\s+/g, ' ');
    fsCaption.textContent = cleanName;
    hideControls();
  }

  // Button controls
  document.getElementById('close-fs').onclick = (e) => {
    e.stopPropagation();
    fs.classList.add('hidden');
  };

  document.getElementById('prev-img').onclick = (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length;
    updateFS();
  };

  document.getElementById('next-img').onclick = (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx + 1) % currentImages.length;
    updateFS();
  };

  // Swipe support
  let startX = 0;
  fs.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  fs.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? document.getElementById('next-img').click() : document.getElementById('prev-img').click();
    }
  });

  // ==================== END FULLSCREEN LOGIC ====================

  backBtn.onclick = () => {
    if (pages.gallery.classList.contains('active')) {
      switchPage('detail');
    } else {
      switchPage('home');
    }
  };

  function switchPage(name) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[name].classList.add('active');
    fs.classList.add('hidden');

    navLogo.style.display = 'block';

    if (name === 'home') {
      navTitle.textContent = '';
      installBtnContainer?.classList.remove('hidden');   // Show Install Button
    } else {
      navTitle.textContent = name === 'detail' ? currentShape?.name : currentGallery;
      installBtnContainer?.classList.add('hidden');      // Hide Install Button
    }

    backBtn.style.display = name === 'home' ? 'none' : 'flex';
    document.getElementById('attribution').style.display = name === 'home' ? 'block' : 'none';
  }

  // Logo click → home
  homeLink.addEventListener('click', e => {
    e.preventDefault();
    switchPage('home');
    renderHome();
  });

  // Menu dropdown
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
      <div style="background:#111;color:#f0f0f0;max-width:420px;width:100%;border-radius:20px;padding:28px 24px;box-shadow:0 20px 40px rgba(0,0,0,0.6);font-size:15px;line-height:1.6;">
        <button onclick="this.closest('div').parentNode.remove()" style="position:absolute;top:12px;right:16px;background:none;border:none;color:#aaa;font-size:28px;cursor:pointer;">×</button>
        <h2 style="text-align:center;margin:0 0 20px;font-size:22px;color:#0a84ff;">Triads</h2>
        <p style="text-align:center;color:#ccc;margin:16px 0;">Master rhythm guitar & the Nashville Number System instantly.</p>
        <div style="font-size:14.5px;color:#ddd;">
          <p>Learn <strong>triad patterns once</strong> — play in <strong>any key</strong>, <strong>any song</strong>, forever.</p>
          <p>No more memorizing hundreds of chords. Just learn a movable shape, know the root, and you’re ready.</p>
          <p>Perfect for worship leaders, songwriters, and rhythm players who want pro-sounding comping without years of theory.</p>
          <p style="margin-top:24px;font-size:13px;color:#888;text-align:center;">
            Free • Open Source • Works Offline<br>Built with ❤️ for the guitar community
          </p>
          <p style="text-align:center;margin-top:20px;">
            <a href="https://github.com/m1820/TriadsApp" target="_blank" style="color:#0a84ff;text-decoration:none;">View on GitHub →</a>
            &nbsp;&nbsp;•&nbsp;&nbsp;
            <a href="https://buymeacoffee.com/m1820" target="_blank" style="color:#ff9f1c;text-decoration:none;">Buy me a coffee</a>
          </p>
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