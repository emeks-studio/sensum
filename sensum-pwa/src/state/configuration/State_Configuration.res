let defaultUrl = "http://127.0.0.1:8545"
let initialUrl: option<string> = None
let networkUrlKey: string = "networkUrl"

let networkUrlAtom = Recoil.atom({
  key: networkUrlKey,
  default: initialUrl,
})

let loadNetworkHook = () => {
  let (_networkUrl, setNetworkUrl) = Recoil.useRecoilState(networkUrlAtom)

  React.useEffect0(() => {
    setNetworkUrl(_ => Dom.Storage2.localStorage->Dom.Storage2.getItem(networkUrlKey))
    None
  })
}

let useNetworkHook = () => {
  let (networkUrl, setNetworkUrl) = Recoil.useRecoilState(networkUrlAtom)

  let saveNetworkUrl = (url: string) => {
    if url == "" {
      Dom.Storage2.localStorage->Dom.Storage2.removeItem(networkUrlKey)
      setNetworkUrl(_ => None)
    } else {
      Dom.Storage2.localStorage->Dom.Storage2.setItem(networkUrlKey, url)
      setNetworkUrl(_ => Some(url))
    }
  }

  (networkUrl, saveNetworkUrl)
}
