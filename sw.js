// sw.js — Minimal, bulletproof service worker (2025 working)
const CACHE_NAME = 'triad-shapes-v1';

// Activate immediately
self.addEventListener('install', e => {
  self.skipWaiting();
});

// Claim clients immediately
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

// Simple network-first strategy
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});