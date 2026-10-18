const cacheName = "TribalLink PTY LTD-Djaa-1.2.2";
const contentToCache = [
    "Build/a1b8a8bd4d9f34e2c3df5e153c20f830.loader.js",
    "Build/f21aa2d52ef6fbfdf150e2a17eb14c8a.framework.js.unityweb",
    "Build/9b46b319da3935945a0a7fd638632955.data.unityweb",
    "Build/5d1a75c5bde9cbe76ef1f22dc74cd0b8.wasm.unityweb",
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
