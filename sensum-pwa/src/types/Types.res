// In order to avoid circule dependencies
// we define types separeted from the rest of the code

// #--- Blockchain types ---#
type network = {
  chainId: int,
  name: string,
}

type provider

type wallet = {
  provider: provider,
  address: string,
}

// TODO: Redefine this type
type confirmedTransaction

module BigInt = {
  type t
  @send external toString: t => string = "toString"
}

type sensation = {
  avatar: BigInt.t,
  message: string,
}

// #--- State types ---#
type config = {
  sensationsContractAddress: string,
  networkUrl: string,
}

module Contract = {
  type t
  type event
  @send external subscribe: (t, string, event => unit) => unit = "on"
  @send external desubscribe: (t, string, event => unit) => unit = "off"
  @send external getSensation: event => sensation = "toObject"
}

module Notification = {
  type t
  type params = {
    body: string,
    icon: string,
    image: string,
    vibrate: list<int>,
    requireInteraction: bool,
  }

  @new external new: string => t = "Notification"
  @new external newWithParams: (string, params) => t = "Notification"

  @scope("Notification") @val
  external permission: string = "permission"

  @scope("Notification") @val
  external requestPermission: unit => Promise.t<string> = "requestPermission"
}

module ServiceWorker = {
  type t
  type registration = {
    active: option<t>
  }

  @scope(("navigator", "serviceWorker")) @val
  external ready: promise<registration> = "ready"

  @send external postMessage: (t, 'message) => unit = "postMessage"
}
