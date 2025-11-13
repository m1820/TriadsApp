
const CACHE_NAME = 'triads-v4'; 

// Files to cache 
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/data.js',
  '/manifest.json',
  '/logo_small.png',
  '/icon-192.png',
  '/icon-512.png',
  // Add your image folders if needed
  '/resources/'
];

// Install → cache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE.map(url => new Request(url, { credentials: 'same-origin' })));
    })
  );
  self.skipWaiting(); // Force new SW to activate immediately
});

// Activate → delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of pages immediately
});

// Fetch → serve from cache first, fall back to network
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Optional: serve a fallback offline page
        // return caches.match('/offline.html');
      });
    })
  );
});