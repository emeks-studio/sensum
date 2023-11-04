%%raw("import './index.css'")

let rootQuery = ReactDOM.querySelector("#root")

switch rootQuery {
| Some(root) => 
  root
    ->ReactDOM.Client.createRoot
    ->ReactDOM.Client.Root.render(_, <App />)
| None => ()
}
