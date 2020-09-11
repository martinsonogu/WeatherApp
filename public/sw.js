self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.js",
        "/style.css",
        "/images/maskable192_icon.png",
      ]);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => {}));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
