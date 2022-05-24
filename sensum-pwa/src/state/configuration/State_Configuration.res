let storage = Dom.Storage2.localStorage

let defaultUrl = "http://127.0.0.1:8545"
let initialUrl: option<string> = None
let networkUrlKey: string = "networkUrl"

let maybeNetworkUrlAtom = Recoil.atom({
  key: networkUrlKey,
  default: initialUrl,
})

let useEffectLoadNetworkFromStorage = () => {
  let (_mNetworkUrl, setNetworkUrl) = Recoil.useRecoilState(maybeNetworkUrlAtom)

  React.useEffect0(() => {
    setNetworkUrl(_ => storage->Dom.Storage2.getItem(networkUrlKey))
    None
  })
}

// useNetworkUrl :: option<string>
let useNetworkUrl = () => {
  let (maybeNetworkUrl, setNetworkUrl) = Recoil.useRecoilState(maybeNetworkUrlAtom)

  let saveNetworkUrl = (url: string) => {
    if url == "" {
      storage->Dom.Storage2.removeItem(networkUrlKey)
      setNetworkUrl(_ => None)
    } else {
      storage->Dom.Storage2.setItem(networkUrlKey, url)
      setNetworkUrl(_ => Some(url))
    }
  }

  (maybeNetworkUrl, saveNetworkUrl)
}
