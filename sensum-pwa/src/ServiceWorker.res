// NOTE: To debug this module in the navigator use: yarn preview

type entry = {
  url: string,
  revision: string,
}

@module("workbox-precaching") external precacheAndRoute: array<entry> => unit = "precacheAndRoute"

@module("workbox-precaching") external cleanupOutdatedCaches: unit => unit = "cleanupOutdatedCaches"

@scope("self") external entries: array<entry> = "__WB_MANIFEST"

// Ref. https://developer.chrome.com/docs/workbox/modules/workbox-precaching
// self.__WB_MANIFEST contains the cacheable entries listed by VitePWA pluggin
precacheAndRoute(entries)

// clean old assets
cleanupOutdatedCaches()

type periodicEvent = {tag: string, waitUntil: promise<unit> => unit}
@val external addPeriodicEventListener: (string, periodicEvent => unit) => unit = "addEventListener"
addPeriodicEventListener("periodicSync", event => {
  if event.tag === "sensum-heartbeat" {
    event.waitUntil(
      Promise.make((resolve, _reject) => {
        Js.Global.setTimeout(
          () => {
            resolve(. ())
          },
          5 * 60 * 1000,
        )->ignore
      }),
    )
  }
})

ServiceWorker_ContractSubcription.initNotifications()
