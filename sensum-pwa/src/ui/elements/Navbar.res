@react.component
let make = (~leftComponent: option<React.element>=?) => {
  switch leftComponent {
  | None => 
    <div
      className="fixed w-full bg-purple-900 border-purple-600 border-2">
      <h1 className="pl-2 text-4xl text-purple-50">
        {"sensum"->React.string}
      </h1>
    </div>
  | Some(component) =>
    <div className="fixed w-full bg-purple-900 border-purple-600 border-2 flex flex-row-reverse">
      <h1 className="fixed top-0 left-2 right-0 text-4xl text-purple-50">
        {"sensum"->React.string}
      </h1>
      {component}
    </div>
  }
}
