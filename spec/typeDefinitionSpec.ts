import { renderApp } from "./helpers/renderApp";
import { 
  findAll,
  click,
  expectTypeDefinition,
  textOf,
  expectLink,
  findWithin,
  expectNotWithin,
  TypeExpectation,
  typeOf,
  complexTypeOf,
  tupleTypeOf,
  typeVariableOf
} from "./helpers/testHelpers";
import { ModuleDocumentation } from "../src/model/ModuleDocumentation";

const itHasTheTypeReference = () => {
  it("provides a reference to the internal type", () => {
    expectTypeReference("/module/Other.Module#SuperAlias", "SuperAlias")
  })
}

describe("type definitions", () => {
  describe("when the definition is a single type", () => {
    describe("when the type definition is the unit type", () => {
      it("displays the type correctly", async () => {
        await renderWithTypeDefinition("()")
        expectTypes([typeOf("()")])
      })
    })

    describe("when the type definition has no args", () => {
      it("displays the type correctly", async () => {
        await renderWithTypeDefinition("String.String")
        expectTypes([typeOf("String")])
      })
    })
  
    describe("when the type definition has args", () => {
      it("displays the type correctly", async () => {
        await renderWithTypeDefinition("Elmer.TestState model msg")
        expectTypes([typeOf("TestState", [typeVariableOf("model"), typeVariableOf("msg")])])
      })
    })

    describe("when the type definition is simply a variable", () => {
      it("displays the types correctly", async () => {
        await renderWithTypeDefinition("model")
        expectTypes([
          typeOf(null, [typeVariableOf("model")]),
        ])
      })
    })

    describe("when the type designation has a type variable filled with a type", () => {
      describe("when the type variable is filled with a single external type name", () => {
        it("displays the type correctly", async () => {
          await renderWithTypeDefinition("List.List String.String")
          expectTypes([
            typeOf("List", [typeOf("String")])
          ])
        })
      })

      describe("when an internal type has a type variable filled with an external type", () => {
        beforeEach(async () => {
          await renderWithTypeDefinition("Other.Module.SuperAlias String.String")
        })

        it("displays the type correctly", () => {
          expectTypes([
            typeOf("SuperAlias", [
              typeOf("String")
            ])
          ])
        })

        itHasTheTypeReference()
      })

      describe("when the type variable is filled with a single internal type name", () => {
        beforeEach(async () => {
          await renderWithTypeDefinition("List.List Other.Module.SuperAlias")
        })

        it("displays the type correctly", () => {
          expectTypes([
            typeOf("List", [typeOf("SuperAlias")])
          ])
        })

        itHasTheTypeReference()
      })

      describe("when a type variable is filled with a type that has a variable", () => {
        beforeEach(async () => {
          await renderWithTypeDefinition("List.List (Other.Module.SuperAlias model msg)")
        })

        it("displays the type correctly", () => {
          expectTypes([
            typeOf("List", [
              typeOf("SuperAlias", [
                typeVariableOf("model"),
                typeVariableOf("msg")
              ])
            ])
          ])
        })

        itHasTheTypeReference()
      })

      describe("when a type variable is filled with the unit type", () => {
        it("displays the type correctly", async () => {
          await renderWithTypeDefinition("Some.Cool.FunModule ()")
          expectTypes([
            typeOf("FunModule", [
              typeOf("()")
            ])
          ])
        })
      })

      describe("when some type variables are filled but not all", () => {
        it("displays the type correctly", async () => {
          await renderWithTypeDefinition("Dict.Dict String.String a")
          expectTypes([
            typeOf("Dict", [
              typeOf("String"),
              typeVariableOf("a")
            ])
          ])
        })
      })
    })
  })

  describe("when the type definition references a type from an external module", () => {
    beforeEach(async () => {
      await renderWithTypeDefinition("External.Module.SuperType model msg")
    })

    it("displays the type correctly", () => {
      expectTypes([
        typeOf("SuperType", [
          typeVariableOf("model"),
          typeVariableOf("msg")
        ])
      ])
    })

    it("does not contain a reference to the type", () => {
      expectNoTypeReference()
    })
  })

  describe("when the type definition references an internal type", () => {
    describe("when the internal type has no type args", () => {
      beforeEach(async () => {
        await renderWithTypeDefinition("Other.Module.SuperAlias")
      })
  
      it("displays the type correctly", () => {  
        expectTypes([typeOf("SuperAlias")])
      })
  
      itHasTheTypeReference()
    })

    describe("when the internal type has type args", () => {
      beforeEach(async () => {
        await renderWithTypeDefinition("Other.Module.SuperAlias model msg")
      })
  
      it("displays the type correctly", () => {  
        expectTypes([
          typeOf("SuperAlias", [
            typeVariableOf("model"),
            typeVariableOf("msg")
          ])
        ])
      })
  
      itHasTheTypeReference()
    })
  })

  describe("when the type definition has multiple type designations", () => {
    describe("when all the types are external", () => {
      it("displays the types correctly", async () => {
        await renderWithTypeDefinition("String.String -> Basics.Int -> String.String -> Elmer.TestState model msg")
        expectTypes([
          typeOf("String"),
          typeOf("Int"),
          typeOf("String"),
          typeOf("TestState", [
            typeVariableOf("model"),
            typeVariableOf("msg")
          ])
        ])
      })  
    })

    describe("when some types are internal", () => {
      beforeEach(async () => {
        await renderWithTypeDefinition("String.String -> Basics.Int -> Other.Module.SuperAlias model msg -> Html.Html model msg")
      })

      it("displays the types correctly", () => {  
        expectTypes([
          typeOf("String"),
          typeOf("Int"),
          typeOf("SuperAlias", [
            typeVariableOf("model"),
            typeVariableOf("msg")
          ]),
          typeOf("Html", [
            typeVariableOf("model"),
            typeVariableOf("msg")
          ])
        ])
      })

      itHasTheTypeReference()
    })
  })

  describe("when the type definition is a tuple", () => {
    describe("when the types are all external", () => {
      it("displays the type correctly", async () => {
        await renderWithTypeDefinition("( String.String, Basics.Int )")
        expectTypes([
          tupleTypeOf(
            typeOf("String"),
            typeOf("Int")
          )
        ])
      })  
    })

    describe("when the tuple contains an internal type", () => {
      beforeEach(async () => {
        await renderWithTypeDefinition("( Other.Module.SuperAlias model msg, Html.Html msg )")
      })

      it("displays the type correctly", () => {  
        expectTypes([
          tupleTypeOf(
            typeOf("SuperAlias", [
              typeVariableOf("model"),
              typeVariableOf("msg")
            ]),
            typeOf("Html", [typeVariableOf("msg")])
          )
        ])
      })

      itHasTheTypeReference()
    })

    describe("when the tuple is a type argument", () => {
      it("displays the type correctly", async () => {
        await renderWithTypeDefinition("List.List ( String.String, String.String )")
        expectTypes([
          typeOf("List", [
            tupleTypeOf(typeOf("String"), typeOf("String"))
          ])
        ])
      })
    })
  })

  describe("when the type definition has a nested function", () => {
    it("displays the type correctly", async () => {
      await renderWithTypeDefinition("(String.String -> Basics.Int) -> String.String")
      expectTypes([
        complexTypeOf([
          typeOf("String"),
          typeOf("Int")
        ]),
        typeOf("String")
      ])
    })
  })

  describe("when the type definition has a nested function as a type argument", () => {
    it("displays the type correctly", async () => {
      await renderWithTypeDefinition("List.List (String.String -> Basics.Int)")
      expectTypes([
        typeOf("List", [
          complexTypeOf([
            typeOf("String"),
            typeOf("Int")
          ])
        ])
      ])
    })
  })

  describe("when the type definition cannot be parsed", () => {
    it("displays nothing", async () => {
      await renderWithTypeDefinition("-> ->")
      var values = findAll("#documentation .value-block .definition")
      expect(textOf(values.item(0))).toEqual("")
    })
  })

})

const expectTypes = (types: Array<TypeExpectation>) => {
  var values = findAll("#documentation .value-block .definition")
  expectTypeDefinition(values.item(0), types)
}

const expectTypeReference = (href: string, name: string) => {
  var values = findAll("#documentation .value-block .definition")
  expectLink(findWithin(values.item(0), "[data-arg-link]"), href, name)
}

const expectNoTypeReference = () => {
  var values = findAll("#documentation .value-block .definition")
  expectNotWithin(values.item(0), "[data-arg-link]")
}

const renderWithTypeDefinition = async (defn: string) => {
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

  await renderApp({ docs, readme: "" })

  const moduleItems = findAll("#module-list li")
  click(moduleItems.item(0))
}
