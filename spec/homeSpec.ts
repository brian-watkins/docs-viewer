import { renderApp } from "./helpers/renderApp"
import { testDocs } from "./fixtures/testDocumentation"
import { findAll, textOf, find } from "./helpers/testHelpers";

describe("home page", () => {
  beforeEach(async () => {
    await renderApp(testDocs, "Here is the Readme content.")
  })

  it("shows a list of modules", () => {
    var modules = findAll("#module-list li")
    expect(textOf(modules.item(0))).toEqual("Module1")
    expect(textOf(modules.item(1))).toEqual("Module1.Module2")
    expect(textOf(modules.item(2))).toEqual("Module1.Module3")
  })

  it("shows the readme", () => {
    expect(textOf(find("#readme"))).toEqual("Here is the Readme content.")
  })
})