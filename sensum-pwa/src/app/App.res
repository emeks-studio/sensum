@react.component
let make = () => {
  <RescriptReactErrorBoundary fallback={_error => <div> {"Unexpected error occurred"->React.string} </div>}>
    <Router />
  </RescriptReactErrorBoundary>
}
