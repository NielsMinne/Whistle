/**
 * Service Worker
 */

/* eslint-disable no-restricted-globals */

const OFFLINE_URL = './offline.html';
const CACHE_NAME = 'v1';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        cache.add(new Request('offline.html', { cache: 'reload' }));
      })
      .catch((error) => console.log(error)),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName.indexOf(CACHE_NAME) === 0) {
          return null;
        }
        return caches.delete(cacheName);
      }),
    )),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(OFFLINE_URL)),
  );
});
