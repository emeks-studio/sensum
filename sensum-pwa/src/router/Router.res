// Ref. https://rescript-lang.org/docs/react/latest/router#basic-example
@react.component
let make = () => {
  let networkUrl = Recoil.useRecoilValue(State.Configuration.networkUrlAtom)
  let url = RescriptReactRouter.useUrl()

  switch networkUrl {
  | None => <Pages_Configuration />
  | _ =>
    switch url.path {
    | list{} => <Pages_Sensations />
    | list{"sensations"} => <Pages_Sensations />
    | list{"config"} => <Pages_Configuration />
    | _ => <Pages_NotFound />
    }
  }
}
