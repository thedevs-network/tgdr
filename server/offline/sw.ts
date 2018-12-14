// This is the "Offline copy of pages" service worker

self.addEventListener('install', function(event) {
    const indexPage = new Request('/');
    event.waitUntil(
      fetch(indexPage).then( (response) => {
        return caches.open('tgdr-offline').then((cache) => {
          return cache.put(indexPage, response);
        });
    }));
  });
  
  self.addEventListener('fetch', (event) => {
    const updateCache = (request) => {
      return caches.open('tgdr-offline').then((cache) => {
        return fetch(request).then(function (response) {
          return cache.put(request, response);
        });
      });
    };
  
    event.waitUntil(updateCache(event.request));
  
    event.respondWith(
      fetch(event.request).catch(function(error) {
        return caches.open('tgdr-offline').then((cache) => {
          return cache.match(event.request).then((matching) => {
            const report =  !matching || matching.status === 404?Promise.reject('no-match'): matching;
            return report
          });
        });
      })
    );
  })
  