// This is the "Offline copy of pages" service worker

self.addEventListener('install',(event: any) => {
    const indexPage = new Request('/');
    event.waitUntil(
      fetch(indexPage).then((response) => {
        return caches.open('tgdr-offline').then((cache) => {
          return cache.put(indexPage, response);
        });
    }));
  });
  
self.addEventListener('fetch', (event: any) => {
  const updateCache = (request) => {
    return caches.open('tgdr-offline').then((cache) => {
      return fetch(request).then((response) => {
        return cache.put(request, response);
      });
    });
  };

  event.waitUntil(updateCache(event.request));

  event.respondWith(
    fetch(event.request).catch((_error) => {
      return caches.open('tgdr-offline').then((cache) => {
        return cache.match(event.request).then((matching: any) => {
          const report =  !matching || matching.status === 404?
          Promise.reject('no-match'): matching;
          return report
        });
      });
    })
  );
})