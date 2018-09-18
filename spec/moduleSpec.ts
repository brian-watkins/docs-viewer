import { renderApp } from "./helpers/renderApp";
import { testDocs } from "./fixtures/testDocumentation"
import { findAll, find, findWithin, textOf, click, expectLink, expectNotWithin, expectAttribute, findAllWithin } from "./helpers/testHelpers"

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
      expectAttribute(values.item(0), "id", "funcOne")
      expectLink(findWithin(values.item(0), "[data-type-name]"), "/module/Module1.Module2#funcOne", "funcOne")

      expectAttribute(values.item(1), "id", "funcTwo")
      expectLink(findWithin(values.item(1), "[data-type-name]"), "/module/Module1.Module2#funcTwo", "funcTwo")

      expectAttribute(values.item(2), "id", "funcThree")
      expectLink(findWithin(values.item(2), "[data-type-name]"), "/module/Module1.Module2#funcThree", "funcThree")
    })

    it("shows the definition for each documented value", () => {
      var values = findAll("#documentation .value-block .definition")

      expectTypeDefinition(values.item(0), [ "FunAlias msg", "String" ])
      expectTypeDefinition(values.item(1), [ "Int", "SomeFunction" ])
      expectTypeDefinition(values.item(2), [ "FunType", "Int" ])
    })

    it("shows the comment for each documented value", () => {
      var values = findAll("#documentation .value-block .comment")
      expect(textOf(values.item(0))).toContain("Here is a comment about funcOne")
      expect(textOf(values.item(1))).toContain("Here is a comment about funcTwo")
      expect(textOf(values.item(2))).toContain("Here is a comment about funcThree")
    })

    describe("when the referenced type is known", () => {
      it("links to types documented in another file", () => {
        var values = findAll("#documentation .value-block .definition")
        expectLink(findWithin(values.item(0), "[data-arg-link]"), "/module/Module1#FunAlias", "FunAlias")
        expectLink(findWithin(values.item(1), "[data-arg-link]"), "/module/Module1.Module3#SomeFunction", "SomeFunction")
      })
    })

    describe("when the refereced type is not known", () => {
      it("does not link to the type", () => {
        var values = findAll("#documentation .value-block .definition")
        expectNotWithin(values.item(2), "[data-arg-link]")
      })
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
      expectAttribute(typeAliases.item(0), "id", "typeAliasOne")
      expectLink(findWithin(typeAliases.item(0), "[data-type-name]"), "/module/Module1.Module2#typeAliasOne", "typeAliasOne")

      expectAttribute(typeAliases.item(1), "id", "typeAliasThree")
      expectLink(findWithin(typeAliases.item(1), "[data-type-name]"), "/module/Module1.Module2#typeAliasThree", "typeAliasThree")

      expectAttribute(typeAliases.item(2), "id", "typeAliasTwo")
      expectLink(findWithin(typeAliases.item(2), "[data-type-name]"), "/module/Module1.Module2#typeAliasTwo", "typeAliasTwo")
    })

    it("shows the comment for the documented type alias", () => {
      var typeAliases = findAll("#documentation .type-alias-block .comment")
      expect(textOf(typeAliases.item(0))).toContain("Represents something cool")
      expect(textOf(typeAliases.item(1))).toContain("Links to another Type Alias")
      expect(textOf(typeAliases.item(2))).toContain("Represents something awesome")
    })

    it("shows the definition for the documented type alias", () => {
      var typeAliases = findAll("#documentation .type-alias-block .definition")
      expectTypeDefinition(typeAliases.item(0), [ "Blah msgA msgB" ])
      expectTypeDefinition(typeAliases.item(1), [ "String", "AwesomeAlias" ])
      expectTypeDefinition(typeAliases.item(2), [ "Model msg" ])
    })

    describe("when the aliased type is unknown", () => {
      it("does not link to the unknown type", () => {
        var typeAliases = findAll("#documentation .type-alias-block .definition")
        expectNotWithin(typeAliases.item(0), "[data-arg-link]")
        expectNotWithin(typeAliases.item(2), "[data-arg-link]")
      })
    })

    describe("when the aliased type is known", () => {
      it("links to the aliased type", () => {
        var typeAliases = findAll("#documentation .type-alias-block .definition")
        expectLink(findWithin(typeAliases.item(1), "[data-arg-link]"), "/module/Module1.Module3#AwesomeAlias", "AwesomeAlias")
      })
    })
  })
})

const expectTypeDefinition = (element: HTMLElement, expectedTypes: Array<string>) => {
  const typeParts = findAllWithin(element, ".type-value")
  expectedTypes.map((expectedType, index) => {
    expectedType.split(" ").map((typeWord) => {
      expect(textOf(typeParts.item(index))).toContain(typeWord)
    })
  })
}
