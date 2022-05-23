%%raw("import './index.css'")

let rootQuery = ReactDOM.querySelector("#root")

switch rootQuery {
| Some(root) => ReactDOM.render(<Recoil.RecoilRoot> <App /> </Recoil.RecoilRoot>, root)
| None => ()
}
