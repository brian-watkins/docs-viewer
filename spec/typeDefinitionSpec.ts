import { renderApp } from "./helpers/renderApp";
import { findAll, click, expectTypeDefinition, textOf, find, expectLink, findWithin, expectNotWithin, TypeExpectation, typeOf, complexTypeOf } from "./helpers/testHelpers";
import { ModuleDocumentation } from "../src/model/ModuleDocumentation";

describe("type definitions", () => {
  describe("when the type definition has one value", () => {
    it("displays the type correctly", () => {
      renderWithTypeDefinition("String")
      expectTypes([typeOf("String")])
    })
  })

  describe("when the type definition has one value with args", () => {
    it("displays the type correctly", () => {
      renderWithTypeDefinition("TestState model msg")
      expectTypes([typeOf("TestState", "model msg")])
    })
  })

  describe("when the type definition references a type from an external module", () => {
    beforeEach(() => {
      renderWithTypeDefinition("External.Module.SuperType model msg")
    })

    it("displays the type correctly", () => {
      expectTypes([typeOf("SuperType", "model msg")])
    })

    it("does not contain a reference to the type", () => {
      var values = findAll("#documentation .value-block .definition")
      expectNotWithin(values.item(0), "[data-arg-link]")
    })
  })

  describe("when the type definition references an internal type", () => {
    describe("when the internal type has no type args", () => {
      beforeEach(() => {
        renderWithTypeDefinition("Other.Module.SuperAlias")
      })
  
      it("displays the type correctly", () => {  
        expectTypes([typeOf("SuperAlias")])
      })
  
      it("creates a reference to the other type", () => {
        var values = findAll("#documentation .value-block .definition")
        expectLink(findWithin(values.item(0), "[data-arg-link]"), "/module/Other.Module#SuperAlias", "SuperAlias")
      })
    })

    describe("when the internal type has type args", () => {
      beforeEach(() => {
        renderWithTypeDefinition("Other.Module.SuperAlias model msg")
      })
  
      it("displays the type correctly", () => {  
        expectTypes([typeOf("SuperAlias", "model msg")])
      })
  
      it("creates a reference to the other type", () => {
        var values = findAll("#documentation .value-block .definition")
        expectLink(findWithin(values.item(0), "[data-arg-link]"), "/module/Other.Module#SuperAlias", "SuperAlias")
      })
    })
  })

  describe("when the type definition has multiple type designations", () => {
    describe("when all the types are external", () => {
      it("displays the types correctly", () => {
        renderWithTypeDefinition("String -> Int -> String -> TestState model msg")
        expectTypes([
          typeOf("String"),
          typeOf("Int"),
          typeOf("String"),
          typeOf("TestState", "model msg")
        ])
      })  
    })

    describe("when some types are internal", () => {
      beforeEach(() => {
        renderWithTypeDefinition("String -> Int -> Other.Module.SuperAlias model msg -> Html.Html model msg")
      })

      it("displays the types correctly", () => {  
        expectTypes([
          typeOf("String"),
          typeOf("Int"),
          typeOf("SuperAlias", "model msg"),
          typeOf("Html", "model msg")
        ])
      })

      it("creates a reference to the other type", () => {
        var values = findAll("#documentation .value-block .definition")
        expectLink(findWithin(values.item(0), "[data-arg-link]"), "/module/Other.Module#SuperAlias", "SuperAlias")
      })
    })
  })

  describe("when the type definition has a parenthesis", () => {
    it("displays the type correctly", () => {
      renderWithTypeDefinition("(String -> Int) -> String")
      expectTypes([
        complexTypeOf([
          typeOf("String"),
          typeOf("Int")
        ]),
        typeOf("String")
      ])
    })
  })

  describe("when the type definition cannot be parsed", () => {
    it("displays nothing", () => {
      renderWithTypeDefinition("-> ->")
      var values = findAll("#documentation .value-block .definition")
      expect(textOf(values.item(0))).toEqual("")
    })
  })

})

const expectTypes = (types: Array<TypeExpectation>) => {
  var values = findAll("#documentation .value-block .definition")
  expectTypeDefinition(values.item(0), types)
}

const renderWithTypeDefinition = (defn: string) => {
  const docs: Array<ModuleDocumentation> = [
    { 
      name: "Main.Module",
      comment: "@docs FunFunction",
      values: [
        { 
          name: "FunFunction",
          comment: "Represents something fun",
          type: defn
        }
      ],
      aliases: []
    },
    { 
      name: "Other.Module",
      comment: "@docs SuperFunction",
      aliases: [
        {
          name: "SuperAlias",
          comment: "Results in something super",
          type: "SuperArg",
          args: []
        }
      ],
      values: []
    }
  ]

  renderApp(docs)

  const moduleItems = findAll("#module-list li")
  click(moduleItems.item(0))
}
