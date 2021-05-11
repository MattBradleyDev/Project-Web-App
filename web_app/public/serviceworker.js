
const CACHE_NAME = 'matt-bradley-cv';
const CACHE_URLS = ['/',
                    '/index.html',
                    '/skills.html',
                    '/qualifications.html',
                    '/design1.html',
                    '/design2.html',
                    '/coffee.html',
                    '/404.html',
                    '/styles.css',
                    '/design1.css',
                    '/design2.css',
                    '/script.js',
                    '/images/aiImage.jpg',
                    '/images/albumImg-big.jpg',
                    '/images/design1_screenshot.png',
                    '/images/design2_screenshot.png',
                    '/images/coffee_screenshot.png',
                    '/images/home.svg',
                    '/images/machineLearningImage.jpeg',
                    '/images/mainImgBanner-small.jpg',
                    '/images/mainImgBanner.jpg',
                    '/images/mainImgBanner-large.jpg',
                    '/images/mainImgBanner-small.webp',
                    '/images/mainImgBanner.webp',
                    '/images/mainImgBanner-large.webp',
                    '/images/mainImgBanner.png',
                    '/images/qualification.svg',
                    'images/skills.svg',
                    'images/snakeImg.jpg',
                    'images/softwareImg.jfif',
                    'images/staffsImage.png',
                    'fonts/Roboto-Regular.eot',
                    'fonts/Roboto-Regular.ttf',
                    'fonts/Roboto-Regular.woff',
                    'images/favicon/android-chrome-192x192.png',
                    'images/favicon/android-chrome-512x512.png',
                    'images/favicon/apple-touch-icon.png',
                    'images/favicon/browserconfig.xml',
                    'images/favicon/favicon-16x16.png',
                    'images/favicon/favicon-32x32.png',
                    'images/favicon/favicon.ico',
                    'images/favicon/mstile-150x150.png',
                    'images/favicon/safari-pinned-tab.svg',
                    'images/favicon/site.webmanifest'];

// Wait until we have been notified that we are installed
self.addEventListener("install", function(event){
    
    // Announce that we are installed
    console.log("Service worker installed", self);
    
    // Create a cache, and add the resources to the cache
   // Tell the "install" event to wait for the promises to resolve before it completes
    event.waitUntil(
    
        caches.open(CACHE_NAME).then(function(cache){
            // Cache has been opened
            console.log("Cache opened: ", cache);
                
            // Now add all URLs to the cache
            return cache.addAll(CACHE_URLS);
        })
    
    );
});

//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName.endsWith('appshell') && CACHE_NAME !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});

//add all URLs to cache when installed
//...
//user has navigated to page - fetch required assets
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            //check whether asset is in cache
            if(response){
                //asset in cache, so return it
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            //asset not in cache so fetch asset from network
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
});



