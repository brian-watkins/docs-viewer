import * as React from "react"
import * as ReactDOM from "react-dom"
import { MemoryRouter } from "react-router-dom"
import { App } from "../../src/components/App"
import { ModuleDocumentation } from "../../src/model/ModuleDocumentation"
import { DocService } from "../../src/services/DocService";
import { FakeDocService } from "../fakes/FakeDocService";
import { wait } from "./testHelpers";

export const renderApp = (testDocumentation: Array<ModuleDocumentation>, readmeContent: string = "") => {
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
  fakeDocService.readme = readmeContent
  fakeDocService.docs = testDocumentation

  ReactDOM.render(app(fakeDocService), div)

  return wait()
}

const app = (fakeDocService: DocService) => (
  <MemoryRouter>
    <App docService={fakeDocService} />
  </MemoryRouter>
)
