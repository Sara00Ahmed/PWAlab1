self.addEventListener("install", (event) => {
  console.log("sw installed!");
  self.skipWaiting();
  event.waitUntil(
    caches
      .open("our-app")
      .then((cache) =>
        cache.addAll([
          "index.html",
          "styles/index.css",
          "js/main.js",
          "other.html",
          "styles/other.css",
          "js/other.js",
        ])
      )
  );
});

self.addEventListener("activate", (event) => {
  console.log("sw Activated!");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request.url).then((file) => {
      if (file) {
        console.log(file);
        console.log("inside if statment");
        return file;
      } else {
        console.log("network request");
        return fetch(event.request.url);
      }
    })
  );
});
