const CACHE_NAME = "pwa-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./icon-192.png",
  "./icon-512.png"
];

// Instalacja — zapis plików do cache
self.addEventListener("install", event => {
  console.log("Service Worker: zainstalowany");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Service Worker: dodaję pliki do cache");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// Aktywacja — usuwanie starych cache’y
self.addEventListener("activate", event => {
  console.log("Service Worker: aktywowany");

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log("Usuwam stary cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

// Obsługa żądań — najpierw cache, potem sieć
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
