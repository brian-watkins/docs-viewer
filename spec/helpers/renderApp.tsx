import * as React from "react"
import * as ReactDOM from "react-dom"
import { MemoryRouter } from "react-router-dom"
import { App } from "../../src/components/App"
import { ModuleDocumentation } from "../../src/model/ModuleDocumentation"
import { DocService } from "../../src/services/DocService";
import { FakeDocService } from "../fakes/FakeDocService";
import { wait } from "./testHelpers";

export interface TestData {
  docs: Array<ModuleDocumentation>,
  readme: string
}

export const renderApp = (testData: TestData, route: string = "/") => {
  var div = document.querySelector("#react-test-app")
  if (div) {
    ReactDOM.unmountComponentAtNode(div);
  }
  else {
    div = document.createElement('div');
    div.id = "react-test-app"
    document.querySelector("body").appendChild(div)  
  }

  const fakeDocService = new FakeDocService()
  fakeDocService.readme = testData.readme
  fakeDocService.docs = testData.docs

  ReactDOM.render(app(fakeDocService, route), div)

  return wait()
}

const app = (fakeDocService: DocService, route: string) => (
  <MemoryRouter initialEntries={[route]}>
    <App docService={fakeDocService} />
  </MemoryRouter>
)
