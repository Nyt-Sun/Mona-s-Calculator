const CACHE_NAME = "mona-calculator-v5"; // incremented version
const FILES_TO_CACHE = [
  "/Mona-s-Calculator/",                  // start URL
  "/Mona-s-Calculator/index.html",        // exact file
  "/Mona-s-Calculator/offline.html",
  "/Mona-s-Calculator/CSS/style.css",
  "/Mona-s-Calculator/js/script.js",
  "/Mona-s-Calculator/manifest.json",
  "/Mona-s-Calculator/icons/icon-192.png",
  "/Mona-s-Calculator/icons/icon-512.png"
];

// Install – cache app shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // activate immediately
});

// Activate – clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // take control of pages immediately
});

// Fetch – cache first, fallback to offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).catch(() => {
        // If navigation request fails, show offline page
        if (event.request.mode === "navigate") {
          return caches.match("/Mona-s-Calculator/index.html"); // use start_url
        }
      });
    })
  );
});
