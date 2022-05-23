let storage = Dom.Storage2.localStorage

let defaultUrl = "http://127.0.0.1:8545"
let initialUrl: option<string> = None
let networkUrlKey: string = "networkUrl"

let networkUrlAtom = Recoil.atom({
  key: networkUrlKey,
  default: initialUrl,
})

let useEffectLoadNetworkFromStorage = () => {
  let (_networkUrl, setNetworkUrl) = Recoil.useRecoilState(networkUrlAtom)

  React.useEffect0(() => {
    setNetworkUrl(_ => storage->Dom.Storage2.getItem(networkUrlKey))
    None
  })
}

let useNetwork = () => {
  let (networkUrl, setNetworkUrl) = Recoil.useRecoilState(networkUrlAtom)

  let saveNetworkUrl = (url: string) => {
    if url == "" {
      storage->Dom.Storage2.removeItem(networkUrlKey)
      setNetworkUrl(_ => None)
    } else {
      storage->Dom.Storage2.setItem(networkUrlKey, url)
      setNetworkUrl(_ => Some(url))
    }
  }

  (networkUrl, saveNetworkUrl)
}
