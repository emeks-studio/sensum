import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing';

// TODO: Use promt for new content instead of autoupdate (?)
// https://vite-plugin-pwa.netlify.app/guide/inject-manifest.html#prompt-for-new-content
// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'SKIP_WAITING')
//     self.skipWaiting();
// })

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));
