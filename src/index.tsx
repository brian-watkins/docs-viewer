import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { App } from "./components/App"
import { HttpDocService } from "./services/DocService"
import ScrollToTop from "./util/ScrollToTop";

const httpDocService = new HttpDocService()

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App docService={httpDocService} />
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById("app")
)