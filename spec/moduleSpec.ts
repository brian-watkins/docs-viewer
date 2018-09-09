import { renderApp } from "./renderApp";
import { testDocs } from "./fixtures/testDocumentation"
import { findAll, find, textOf, click } from "./testHelpers"

var wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1)
  })
}

describe("when a module is clicked", () => {
  beforeEach(() => {
    renderApp(testDocs)

    const moduleItems = findAll("#modules li a")
    click(moduleItems.item(1))
  })
  
  it("shows the title for that module", async () => {
    var title = find("#title")
    expect(textOf(title)).toEqual("Module1.Module2")
  })
})