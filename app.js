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
  const backBtn = document.getElementById('back-btn');
  const fs = document.getElementById('fullscreen');
  const fsImg = document.getElementById('fs-image');
  const fsControls = document.getElementById('fs-controls');
  const fsClose = document.getElementById('close-fs');
  const fsCounter = document.getElementById('fs-counter');
  const fsCaption = document.getElementById('fs-caption');

  // MENU DROPDOWN
  const menuToggle = document.getElementById('menu-toggle');
  const menuDropdown = document.getElementById('menu-dropdown');
  const menuItems = document.getElementById('menu-items');

  // COMING SOON NOTICE
  const notice = document.getElementById('coming-soon-notice');
  const dismissBtn = document.getElementById('dismiss-notice');
  if (localStorage.getItem('noticeDismissed') === 'true') {
    notice.classList.add('hidden');
  }
  dismissBtn.onclick = () => {
    notice.classList.add('hidden');
    localStorage.setItem('noticeDismissed', 'true');
  };

  let currentImages = [], currentIdx = 0;
  let currentShape = null, currentGallery = '';
  let controlsTimeout;

  function showControls() {
    [fsControls, fsClose, fsCounter, fsCaption].forEach(el => el?.classList.add('active'));
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(hideControls, 3000);
  }
  function hideControls() {
    [fsControls, fsClose, fsCounter, fsCaption].forEach(el => el?.classList.remove('active'));
  }

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
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.alignItems = 'center';

      const img = document.createElement('img');
      img.src = src; img.className = 'img-thumb';
      img.onclick = () => openFS(i);

      const fileName = src.split('/').pop();
      const cleanName = fileName.replace('.png', '').replace('-sharp', '#').replace(/\s+/g, ' ');
      const caption = document.createElement('div');
      caption.className = 'img-caption';
      caption.textContent = cleanName;

      wrapper.appendChild(img);
      wrapper.appendChild(caption);
      imageGrid.appendChild(wrapper);
    });

    switchPage('gallery');
  }

  function openFS(i) {
    currentIdx = i; updateFS();
    fs.classList.remove('hidden');
    hideControls();
    fs.onclick = (e) => {
      if (e.target.closest('.fs-btn') || e.target === fsImg) return;
      showControls();
    };
  }

  function updateFS() {
    fsImg.src = currentImages[currentIdx];
    fsCounter.textContent = `${currentIdx + 1} / ${currentImages.length}`;
    const fileName = currentImages[currentIdx].split('/').pop();
    const cleanName = fileName.replace('.png', '').replace('-sharp', '#').replace(/\s+/g, ' ');
    fsCaption.textContent = cleanName;
    hideControls();
  }

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

  let startX = 0;
  fs.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  fs.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) document.getElementById('next-img').click();
      else document.getElementById('prev-img').click();
    }
  });

  backBtn.onclick = () => {
    if (pages.gallery.classList.contains('active')) switchPage('detail');
    else if (pages.detail.classList.contains('active')) switchPage('home');
  };

  function switchPage(name) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[name].classList.add('active');
    fs.classList.add('hidden');

    let t = "Triad Shapes";
    if (name === 'detail') t = currentShape?.name || t;
    if (name === 'gallery') t = currentGallery || t;
    navTitle.textContent = t;
    backBtn.style.display = (name === 'home') ? 'none' : 'flex';

    const attribution = document.getElementById('attribution');
    attribution.style.display = (name === 'home') ? 'block' : 'none';
  }

  function renderMenuDropdown() {
    menuItems.innerHTML = '';
    SHAPES_DATA.forEach((shape, i) => {
      const item = document.createElement('div');
      item.className = 'menu-dropdown-item';
      item.textContent = shape.name;
      item.onclick = (e) => {
        e.stopPropagation();
        showDetail(i);
        menuDropdown.classList.remove('active');
      };
      menuItems.appendChild(item);
    });
  }

  menuToggle.onclick = (e) => {
    e.stopPropagation();
    menuDropdown.classList.toggle('active');
  };

  document.addEventListener('click', () => {
    menuDropdown.classList.remove('active');
  });

  menuDropdown.onclick = (e) => e.stopPropagation();

  renderHome();
  renderMenuDropdown();
  switchPage('home');
});