%%raw("import './index.css'")

let rootQuery = ReactDOM.querySelector("#root")

switch rootQuery {
| Some(root) => ReactDOM.render(<App />, root)
| None => ()
}