import { renderApp } from "./helpers/renderApp"
import { testDocs } from "./fixtures/testDocumentation"
import { findAll, textOf, find } from "./helpers/testHelpers";

describe("initial page", () => {
  describe("when the app is accessed at the root page", () => {
    beforeEach(async () => {
      await renderApp({ docs: testDocs, readme: "Here is the Readme content." })
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

  describe("when a module page is accessed directly", () => {
    beforeEach(async () => {
      await renderApp({ docs: testDocs, readme: "Here is the Readme content." }, "/module/Module1.Module2")
    })
    
    it("renders the module documentation", () => {
      var title = find("#module h1")
      expect(textOf(title)).toEqual("Module1.Module2")
    })
  })
})

