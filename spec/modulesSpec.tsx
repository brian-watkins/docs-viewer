import * as React from "react"
import * as ReactDOM from "react-dom"

import { App, ModuleDocumentation } from "../src/components/App"
import { testDocs } from "./fixtures/testDocumentation"

var renderApp = (testDocumentation: Array<ModuleDocumentation>) => {
  var div = document.querySelector("#react-test-app")
  if (!div) {
    div = document.createElement('div');
    div.id = "react-test-app"
    document.querySelector("body").appendChild(div)  
  }
  ReactDOM.render(<App moduleDocs={testDocumentation} />, div);
}

var wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1)
  })
}

describe("modules", () => {
  it("shows a list of modules", () => {
    renderApp(testDocs)
    var modules = document.querySelectorAll("#modules li")
    expect(modules.item(0).textContent).toEqual("Module1")
    expect(modules.item(1).textContent).toEqual("Module1.Module2")
    expect(modules.item(2).textContent).toEqual("Module1.Module3")
  })
})