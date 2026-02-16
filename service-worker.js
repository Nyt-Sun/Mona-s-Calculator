const CACHE_NAME = "mona-calculator-v3";
const FILES_TO_CACHE = [
  "/Mona-s-Calculator/",
  "/Mona-s-Calculator/index.html",
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
  self.skipWaiting();
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
  self.clients.claim();
});

// Fetch – cache first, fallback to offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("/Mona-s-Calculator/offline.html");
        }
      });
    })
  );
});
