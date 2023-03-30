const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  '/',
  '/offline',
  '/scan',
  '/manifest.json',
  '/styles/styles.css',
  '/img/no-signal.png',
  '/assets/Poppins-Regular.ttf'
];


// Install Files

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(PRECACHE)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(self.skipWaiting())
    );
  });

  // The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      }).then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      }).then(() => self.clients.claim())
    );
  });

  // The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // Check if requested data is already in cache
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // If it is, use cached data
                return cachedResponse
            } else {
                // Else fetch the new data
                return fetch(event.request)
                    .then((fetchResponse) => {
                        // Save new data in dynamic cache
                        return caches.open(PRECACHE).then((cache) => {
                            cache.put(event.request.url, fetchResponse.clone())
                            return fetchResponse
                        })
                    })
                    .catch(() => {
                        // Show offline page if fetch failed
                        return caches.open(PRECACHE).then((cache) => cache.match('/offline'))
                    })
            }
        }),
    )
})