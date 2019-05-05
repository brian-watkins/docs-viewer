import { renderApp, defaultFakes, FakeDependencies } from "./helpers/renderApp"
import { findAll, textOf, find, expectLinkOpensInNewTab, click } from "./helpers/testHelpers";
import { Package } from "../src/model/Package";

describe("initial page", () => {
  describe("when the app is accessed at the root page", () => {
    beforeEach(async () => {
      var fakes = defaultFakes()
      fakes.packages = [
        new Package("fake-package", [
          { major: 9, minor: 0, patch: 0 },
          { major: 8, minor: 2, patch: 0 }
        ]),
        new Package("super-package", [
          { major: 3, minor: 3, patch: 3 },
          { major: 2, minor: 1, patch: 6 },
          { major: 1, minor: 1, patch: 6 }
        ])
      ]
      await renderApp(fakes, "/")
    })

    it("shows a list of packages", () => {
      var packages = findAll("#packages li")
      expect(textOf(packages.item(0))).toContain("fake-package")
      expect(textOf(packages.item(1))).toContain("super-package")
    })

    it("links to the latest version for each package", () => {
      var packageLinks = findAll("#packages li")
      click(packageLinks.item(1))
      expect(textOf(find("#banner"))).toContain("super-package")
      expect(textOf(find("#banner"))).toContain("3.3.3")
    })
  })

  describe("when the app is accessed at the root page for a package", () => {
    beforeEach(async () => {
      await renderApp(defaultFakes(), "/fake-package")
    })
  
    it("shows a list of modules", () => {
      var modules = findAll("#module-list li")
      expect(textOf(modules.item(0))).toEqual("Module1")
      expect(textOf(modules.item(1))).toEqual("Module1.Module2")
      expect(textOf(modules.item(2))).toEqual("Module1.Module3")
    })
  
    it("shows the readme", () => {
      expect(textOf(find("#readme"))).toContain("Here is the Readme content.")
    })

    describe("when there is a link in the readme", () => {
      it("opens the link in a new tab", () => {
        expectLinkOpensInNewTab(find("#readme a"))
      })
    })
  })

  describe("when a module page is accessed directly", () => {
    beforeEach(async () => {
      var fakes = defaultFakes()
      fakes.packages = [
        new Package("fake-package", [ { major: 9, minor: 0, patch: 0 } ])
      ]
      await renderApp(fakes, "/fake-package/versions/9.0.0/module/Module1.Module2")
    })
    
    it("renders the module documentation", () => {
      var title = find("#module h1")
      expect(textOf(title)).toEqual("Module1.Module2")
    })
  })

  describe("when an unknown module page is accessed directly", () => {
    let fakes: FakeDependencies

    beforeEach(async () => {
      fakes = defaultFakes()
      fakes.packages = [
        new Package("fake-package", [ 
          { major: 20, minor: 10, patch: 0 },
          { major: 9, minor: 0, patch: 0 }
        ])
      ]
      await renderApp(fakes, "/fake-package/versions/9.0.0/module/Unknown.Module")
    })

    it("renders the readme page for this version", () => {
      expect(textOf(find("#banner"))).toContain("9.0.0")
      expect(textOf(find("#readme"))).toContain("Here is the Readme content.")
    })
  })
})

