import { renderApp, defaultFakes } from "./helpers/renderApp"
import { findAll, textOf, find } from "./helpers/testHelpers";

describe("initial page", () => {
  describe("when the app is accessed at the root page", () => {
    beforeEach(async () => {
      await renderApp(defaultFakes())
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
      await renderApp(defaultFakes(), "/versions/9.0.0/module/Module1.Module2")
    })
    
    it("renders the module documentation", () => {
      var title = find("#module h1")
      expect(textOf(title)).toEqual("Module1.Module2")
    })
  })
})

