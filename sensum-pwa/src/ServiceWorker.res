// NOTE: To debug this module in the navigator use: yarn preview

type entry = {
    url: string,
    revision: string
}

@module("workbox-precaching") external precacheAndRoute: array<entry> => unit = "precacheAndRoute"

@module("workbox-precaching") external cleanupOutdatedCaches: unit => unit = "cleanupOutdatedCaches"

@scope("self") external entries: array<entry> = "__WB_MANIFEST"

// Ref. https://developer.chrome.com/docs/workbox/modules/workbox-precaching
// self.__WB_MANIFEST contains the cacheable entries listed by VitePWA pluggin 
precacheAndRoute(entries)

// clean old assets
cleanupOutdatedCaches()

ServiceWorker_ContractSubcription.initNotifications()