// Cache name is versioned manually; bump on structural SW changes.
// Note: navigation/HTML requests always go network-first so users never
// get stuck on a stale build after a new deploy.
const CACHE_NAME = 'app-cache-v2';
const ASSETS_TO_CACHE = [];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => (ASSETS_TO_CACHE.length ? cache.addAll(ASSETS_TO_CACHE) : Promise.resolve()))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await clients.claim();
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)));
    })()
  );
});

self.addEventListener('message', (event) => {
  try {
    const data = event.data;
    if (data && data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  } catch (e) {
    // ignore
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  // Network-first for navigations and index.html: guarantees a new deploy
  // is picked up on next load instead of serving a cached shell forever.
  const isNavigation = request.mode === 'navigate' || request.destination === 'document';
  if (isNavigation) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  // Cache-first with background refresh for hashed static assets
  // (js/css/images have content hashes in their filenames, so caching
  // them aggressively is safe and improves performance).
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
