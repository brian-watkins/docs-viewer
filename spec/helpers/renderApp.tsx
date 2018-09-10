import * as React from "react"
import * as ReactDOM from "react-dom"
import { MemoryRouter } from "react-router-dom"
import { App } from "../../src/components/App"
import { ModuleDocumentation } from "../../src/model/ModuleDocumentation"

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

  ReactDOM.render(app(testDocumentation), div)
}

const app = (testDocumentation: Array<ModuleDocumentation>) => (
  <MemoryRouter>
    <App docs={testDocumentation} />
  </MemoryRouter>
)
