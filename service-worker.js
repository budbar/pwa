self.addEventListener("install", event => {
  console.log("Service Worker: zainstalowany");
});

self.addEventListener("fetch", event => {
  console.log("Pobieranie:", event.request.url);
});

self.addEventListener("activate", event => {
  console.log("Service Worker: aktywowany");

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== "pwa-v1") {
            console.log("Usuwam stary cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  return self.clients.claim();
});