import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { App } from "./components/App"
import { HttpDocService } from "./services/DocService"
import ScrollToTop from "./util/ScrollToTop";

const httpDocService = new HttpDocService()

const elmerVersions = [
  { major: 4, minor: 0, patch: 0 },
  { major: 3, minor: 3, patch: 1 }
]

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App docService={httpDocService} versions={elmerVersions} />
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById("app")
)