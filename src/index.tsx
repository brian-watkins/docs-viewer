import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { App } from "./components/App"
import { HttpDocService } from "./adapters/HttpDocService"
import ScrollToTop from "./util/ScrollToTop";
import { GoogleAnalyticsService, GTag } from "./adapters/GoogleAnalyticsService";
import { Package } from "./model/Package";

const httpDocService = new HttpDocService()

declare var gtag: GTag
const googleAnalyticsService = new GoogleAnalyticsService(gtag, 'UA-92414229-1')

const packages = [
  new Package("elmer", [
    { major: 6, minor: 0, patch: 0 },
    { major: 5, minor: 0, patch: 1 },
    { major: 5, minor: 0, patch: 0 },
    { major: 4, minor: 0, patch: 0 },
    { major: 3, minor: 3, patch: 1 }
  ]),
  new Package("elmer.http", [
    { major: 2, minor: 0, patch: 0 },
    { major: 1, minor: 0, patch: 0 }
  ])
]

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App
        docService={httpDocService}
        analyticsService={googleAnalyticsService}
        packages={packages}
      />
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById("app")
)