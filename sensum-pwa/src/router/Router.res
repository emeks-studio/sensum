
// Ref. https://rescript-lang.org/docs/react/latest/router#basic-example
@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()
  
  switch url.path {
    | list{} => <Pages_Sensations/>
    | list{"sensations"} => <Pages_Sensations/>
    | _ => <Pages_NotFound/>
  }
}
