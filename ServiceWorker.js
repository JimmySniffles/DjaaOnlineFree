const cacheName = "TribalLink PTY LTD-Djaa-1.2.2";
const contentToCache = [
    "Build/4cccdbf7f6f97aaaac5dfece2e696398.loader.js",
    "Build/f21aa2d52ef6fbfdf150e2a17eb14c8a.framework.js.unityweb",
    "Build/2a835d42261ba4c6e54e56a3d696a5b3.data.unityweb",
    "Build/cd0be549497c420d4c0ee2fb35a31355.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
