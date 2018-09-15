import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { App } from "./components/App"
import "./styles/base.scss"

import { testDocs } from "../spec/fixtures/testDocumentation"

ReactDOM.render(
  <BrowserRouter>
    <App docs={testDocs} />
  </BrowserRouter>,
  document.getElementById("app")
)