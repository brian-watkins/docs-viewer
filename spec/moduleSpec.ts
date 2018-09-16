import { renderApp } from "./helpers/renderApp";
import { testDocs } from "./fixtures/testDocumentation"
import { findAll, find, findWithin, textOf, click, expectLinkTo } from "./helpers/testHelpers"

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

    const moduleItems = findAll("#module-list li")
    click(moduleItems.item(1))
  })
  
  it("highlights the selected module", () => {
    var selectedItem = find("#module-list li.selected")
    expect(textOf(selectedItem)).toEqual("Module1.Module2")
  })

  it("shows the title of the module", () => {
    var title = find("#module h1")
    expect(textOf(title)).toEqual("Module1.Module2")
  })

  it("shows the description of the module", () => {
    var doc = find("#documentation")
    expect(textOf(doc)).toContain("Comment about Module1.Module2")
  })

  describe("when there are values", () => {
    it("shows the documented values", () => {
      var values = findAll("#values li.function")
      expect(textOf(values.item(0))).toEqual("funcOne")
      expect(textOf(values.item(1))).toEqual("funcTwo")
    })

    it("adds a link to the value", () => {
      var values = findAll("#documentation .value-block")
      expectLinkTo(findWithin(values.item(0), ".name"), "#funcOne")
      expectLinkTo(findWithin(values.item(1), ".name"), "#funcTwo")
      expectLinkTo(findWithin(values.item(2), ".name"), "#funcThree")
    })

    it("links to an item documented in another file", () => {
      var values = findAll("#documentation .value-block")
      expectLinkTo(findWithin(values.item(0), "[data-arg-link]"), "/module/Module1#FunAlias")
      expectLinkTo(findWithin(values.item(1), "[data-arg-link]"), "/module/Module1.Module3#SomeFunction")
    })

    it("shows the details for each documented value", () => {
      var values = findAll("#documentation .value-block")
      expect(textOf(findWithin(values.item(0), ".title"))).toContain("funcOne : FunAlias msg -> String")
      expect(textOf(findWithin(values.item(0), ".comment"))).toContain("Here is a comment about funcOne")

      expect(textOf(findWithin(values.item(1), ".title"))).toContain("funcTwo : Int -> SomeFunction")
      expect(textOf(findWithin(values.item(1), ".comment"))).toContain("Here is a comment about funcTwo")

      expect(textOf(findWithin(values.item(2), ".title"))).toContain("funcThree : Int -> Int")
      expect(textOf(findWithin(values.item(2), ".comment"))).toContain("Here is a comment about funcThree")
    })
  })

  describe("when there are type aliases", () => {
    it("shows the documented type aliases", () => {
      var types = findAll("#values li.type-alias")
      expect(textOf(types.item(0))).toEqual("typeAliasOne")
      expect(textOf(types.item(1))).toEqual("typeAliasTwo")
    })

    it("adds a link to the type alias", () => {
      var typeAliases = findAll("#documentation .type-alias-block")
      expectLinkTo(findWithin(typeAliases.item(0), ".name"), "#typeAliasOne")
      expectLinkTo(findWithin(typeAliases.item(1), ".name"), "#typeAliasTwo")
    })

    it("shows the details for each documented type alias", () => {
      var typeAliases = findAll("#documentation .type-alias-block")
      expect(textOf(findWithin(typeAliases.item(0), ".title"))).toContain("type alias typeAliasOne msgA msgB = Some.Type.blah msgA msgB")
      expect(textOf(findWithin(typeAliases.item(0), ".comment"))).toContain("Represents something cool")

      expect(textOf(findWithin(typeAliases.item(1), ".title"))).toContain("type alias typeAliasTwo msg = Some.Type.Model msg")
      expect(textOf(findWithin(typeAliases.item(1), ".comment"))).toContain("Represents something awesome")
    })
  })
})

