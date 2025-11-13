document.addEventListener('DOMContentLoaded', () => {
  const pages = { home: document.getElementById('home'), detail: document.getElementById('shape-detail'), gallery: document.getElementById('gallery') };
  const menuList = document.getElementById('menu-list');
  const submenuList = document.getElementById('submenu-list');
  const imageGrid = document.getElementById('image-grid');
  const shapeTitle = document.getElementById('shape-title');
  const goodforText = document.getElementById('goodfor-text');
  const galleryTitle = document.getElementById('gallery-title');
  const navTitle = document.getElementById('nav-title');
  const backBtn = document.getElementById('back-btn');
  const fs = document.getElementById('fullscreen');
  const fsImg = document.getElementById('fs-image');
  const fsControls = document.getElementById('fs-controls');
  const fsClose = document.getElementById('close-fs');
  const fsCounter = document.getElementById('fs-counter');
  const fsCaption = document.getElementById('fs-caption');
  const menuToggle = document.getElementById('menu-toggle');
  const menuDropdown = document.getElementById('menu-dropdown');
  const menuItems = document.getElementById('menu-items');
  const notice = document.getElementById('coming-soon-notice');
  const dismissBtn = document.getElementById('dismiss-notice');

  let currentImages = [], currentIdx = 0;
  let currentShape = null, currentGallery = '';
  let controlsTimeout;

  // Dismiss notice
  if (localStorage.getItem('noticeDismissed') === 'true') notice.classList.add('hidden');
  dismissBtn.onclick = () => { notice.classList.add('hidden'); localStorage.setItem('noticeDismissed', 'true'); };

  function showControls() {
    [fsControls, fsClose, fsCounter, fsCaption].forEach(el => el?.classList.add('active'));
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(hideControls, 3000);
  }
  function hideControls() { [fsControls, fsClose, fsCounter, fsCaption].forEach(el => el?.classList.remove('active')); }

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
    switchPage('gallery');
  }

  function openFS(i) {
    currentIdx = i; updateFS();
    fs.classList.remove('hidden');
    hideControls();
    fs.onclick = e => { if (!e.target.closest('.fs-btn') && e.target !== fsImg) showControls(); };
  }

  function updateFS() {
    fsImg.src = currentImages[currentIdx];
    fsCounter.textContent = `${currentIdx + 1} / ${currentImages.length}`;
    const cleanName = currentImages[currentIdx].split('/').pop().replace('.png','').replace('-sharp','#').replace(/\s+/g,' ');
    fsCaption.textContent = cleanName;
    hideControls();
  }

  document.getElementById('close-fs').onclick = e => { e.stopPropagation(); fs.classList.add('hidden'); };
  document.getElementById('prev-img').onclick = e => { e.stopPropagation(); currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length; updateFS(); };
  document.getElementById('next-img').onclick = e => { e.stopPropagation(); currentIdx = (currentIdx + 1) % currentImages.length; updateFS(); };

  let startX = 0;
  fs.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  fs.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? document.getElementById('next-img').click() : document.getElementById('prev-img').click();
  });

  backBtn.onclick = () => { pages.gallery.classList.contains('active') ? switchPage('detail') : switchPage('home'); };

  function switchPage(name) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[name].classList.add('active');
    fs.classList.add('hidden');
    navTitle.textContent = name === 'detail' ? currentShape?.name : name === 'gallery' ? currentGallery : 'Triad Shapes';
    backBtn.style.display = name === 'home' ? 'none' : 'flex';
    document.getElementById('attribution').style.display = name === 'home' ? 'block' : 'none';
  }

  // MENU DROPDOWN — WITH "About" RESTORED
  function renderMenuDropdown() {
    menuItems.innerHTML = '';
    SHAPES_DATA.forEach((shape, i) => {
      const item = document.createElement('div');
      item.className = 'menu-dropdown-item';
      item.textContent = shape.name;
      item.onclick = e => { e.stopPropagation(); showDetail(i); menuDropdown.classList.remove('active'); };
      menuItems.appendChild(item);
    });
    // ABOUT ITEM — BACK AGAIN
    const about = document.createElement('div');
    about.className = 'menu-dropdown-item';
    about.textContent = 'About Triad Shapes';
    about.onclick = e => { e.stopPropagation(); showAbout(); menuDropdown.classList.remove('active'); };
    menuItems.appendChild(about);
  }

  function showAbout() {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:2000; display:flex; align-items:center; justify-content:center; padding:20px;';
    modal.innerHTML = `
      <div style="background:#111; color:#f0f0f0; max-width:420px; width:100%; border-radius:20px; padding:28px 24px; box-shadow:0 20px 40px rgba(0,0,0,0.6); font-size:15px; line-height:1.6;">
        <button onclick="this.closest('div').parentNode.remove()" style="position:absolute; top:12px; right:16px; background:none; border:none; color:#aaa; font-size:28px; cursor:pointer;">×</button>
        <h2 style="text-align:center; margin:0 0 20px; font-size:22px; color:#0a84ff;">Triad Shapes</h2>
        <p style="text-align:center; color:#ccc; margin:16px 0;">Master rhythm guitar & the Nashville Number System instantly.</p>
        <div style="font-size:14.5px; color:#ddd;">
          <p>Learn <strong>triad patterns once</strong> — play in <strong>any key</strong>, <strong>any song</strong>, forever.</p>
          <p>No more memorizing hundreds of chords. Just learn a movable shape, know the root, and you’re ready for any progression.</p>
          <p>Perfect for worship leaders, songwriters, and rhythm players who want pro-sounding comping without years of theory.</p>
          <p style="margin-top:24px; font-size:13px; color:#888; text-align:center;">
            Free • Open Source • Works Offline<br>Built with ❤️ for the guitar community
          </p>
          <p style="text-align:center; margin-top:20px;">
            <a href="https://github.com/m1820/TriadsApp" target="_blank" style="color:#0a84ff; text-decoration:none;">View on GitHub →</a>
            &nbsp;&nbsp;•&nbsp;&nbsp;
            <a href="https://buymeacoffee.com/m1820" target="_blank" style="color:#ff9f1c; text-decoration:none;">Buy me a coffee Coffee</a>
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