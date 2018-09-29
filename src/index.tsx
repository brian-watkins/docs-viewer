import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { App } from "./components/App"

import * as testDocs from "../elmer-docs.json"
import ScrollToTop from "./util/ScrollToTop";

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App docs={testDocs} />
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById("app")
)