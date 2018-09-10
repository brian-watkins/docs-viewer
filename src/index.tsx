import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { App } from "./components/App"

ReactDOM.render(
  <BrowserRouter>
    <App docs={[]} />
  </BrowserRouter>,
  document.getElementById("example")
)