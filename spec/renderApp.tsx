import * as React from "react"
import * as ReactDOM from "react-dom"
import { MemoryRouter } from "react-router-dom"
import { App, ModuleDocumentation } from "../src/components/App"

export const renderApp = (testDocumentation: Array<ModuleDocumentation>) => {
  var div = document.querySelector("#react-test-app")
  if (div) {
    ReactDOM.unmountComponentAtNode(div);
  }
  else {
    div = document.createElement('div');
    div.id = "react-test-app"
    document.querySelector("body").appendChild(div)  
  }

  ReactDOM.render(
  <MemoryRouter>
    <App moduleDocs={testDocumentation} />
  </MemoryRouter>, div);
}
