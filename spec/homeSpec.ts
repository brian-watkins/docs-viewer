import { renderApp } from "./helpers/renderApp"
import { testDocs } from "./fixtures/testDocumentation"
import { findAll, textOf } from "./helpers/testHelpers";

describe("home page", () => {
  beforeEach(() => {
    renderApp(testDocs)
  })

  it("shows a list of modules", () => {
    var modules = findAll("#modules li")
    expect(textOf(modules.item(0))).toEqual("Module1")
    expect(textOf(modules.item(1))).toEqual("Module1.Module2")
    expect(textOf(modules.item(2))).toEqual("Module1.Module3")
  })
})