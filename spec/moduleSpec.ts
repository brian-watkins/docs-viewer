import { renderApp } from "./helpers/renderApp";
import { testDocs } from "./fixtures/testDocumentation"
import { findAll, find, findWithin, textOf, click, expectLink, expectNotWithin, expectAttribute, typeOf, expectTypeDefinition, typeVariableOf, findAllWithin } from "./helpers/testHelpers"

describe("when a module is clicked", () => {
  beforeEach(async () => {
    await renderApp(testDocs)

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

      expectTypeDefinition(values.item(0), [ typeOf("FunAlias", [typeVariableOf("msg")]), typeOf("String") ])
      expectTypeDefinition(values.item(1), [ typeOf("Int"), typeOf("SomeFunction") ])
      expectTypeDefinition(values.item(2), [ typeOf("FunType"), typeOf("Int") ])
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
    it("adds a link to the type alias", () => {
      var typeAliases = findAll("#documentation .type-alias-block")
      expectAttribute(typeAliases.item(0), "id", "typeAliasOne")
      expectLink(findWithin(typeAliases.item(0), "[data-type-name]"), "/module/Module1.Module2#typeAliasOne", "typeAliasOne")

      expectAttribute(typeAliases.item(1), "id", "typeAliasThree")
      expectLink(findWithin(typeAliases.item(1), "[data-type-name]"), "/module/Module1.Module2#typeAliasThree", "typeAliasThree")

      expectAttribute(typeAliases.item(2), "id", "typeAliasTwo")
      expectLink(findWithin(typeAliases.item(2), "[data-type-name]"), "/module/Module1.Module2#typeAliasTwo", "typeAliasTwo")
    })

    it("shows the args for the type alias", () => {
      var typeAliases = findAll("#documentation .type-alias-block")
      const typeArgs1 = findAllWithin(findWithin(typeAliases.item(0), "[data-type-args"), ".type-designation")
      expect(textOf(typeArgs1.item(0))).toEqual("msgA")
      expect(textOf(typeArgs1.item(1))).toEqual("msgB")

      const typeArgs2 = findAllWithin(findWithin(typeAliases.item(1), "[data-type-args"), ".type-designation")
      expect(typeArgs2.length).toEqual(0)

      const typeArgs3 = findAllWithin(findWithin(typeAliases.item(2), "[data-type-args"), ".type-designation")
      expect(textOf(typeArgs3.item(0))).toEqual("msg")
    })

    it("shows the comment for the documented type alias", () => {
      var typeAliases = findAll("#documentation .type-alias-block .comment")
      expect(textOf(typeAliases.item(0))).toContain("Represents something cool")
      expect(textOf(typeAliases.item(1))).toContain("Links to another Type Alias")
      expect(textOf(typeAliases.item(2))).toContain("Represents something awesome")
    })

    it("shows the definition for the documented type alias", () => {
      var typeAliases = findAll("#documentation .type-alias-block .definition")
      expectTypeDefinition(typeAliases.item(0), [ typeOf("Blah", [typeVariableOf("msgA"), typeVariableOf("msgB")]) ])
      expectTypeDefinition(typeAliases.item(1), [ typeOf("String"), typeOf("AwesomeAlias") ])
      expectTypeDefinition(typeAliases.item(2), [ typeOf("Model", [typeVariableOf("msg")]) ])
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
