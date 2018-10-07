import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { App } from "./components/App"
import { HttpDocService } from "./adapters/HttpDocService"
import ScrollToTop from "./util/ScrollToTop";
import { GoogleAnalyticsService, GTag } from "./adapters/GoogleAnalyticsService";

const httpDocService = new HttpDocService()

declare var gtag: GTag
const googleAnalyticsService = new GoogleAnalyticsService(gtag, 'UA-92414229-1')

const elmerVersions = [
  { major: 4, minor: 0, patch: 0 },
  { major: 3, minor: 3, patch: 1 }
]

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App
        docService={httpDocService}
        analyticsService={googleAnalyticsService}
        versions={elmerVersions}
      />
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById("app")
)