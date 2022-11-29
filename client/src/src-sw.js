// TODO: Create a service worker that caches static assets:
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

precacheAndRoute(self.__WB_MANIFEST);

const cacheName = 'static-resources';
// The destination read-only property of the Request interface returns a string describing the type of content being requested.
// https://developer.mozilla.org/en-US/docs/Web/API/Request/destination
const matchCallback = ({ request }) => {
  console.log(request);
  return (
    // CSS
    request.destination === 'style' ||
    // JavaScript
    request.destination === 'script'
  );
};

registerRoute(
  matchCallback,
  new StaleWhileRevalidate({
    cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);