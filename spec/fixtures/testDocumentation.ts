import { ModuleDocumentation } from "../../src/model/ModuleDocumentation"

export const testDocs : Array<ModuleDocumentation> = [
  { 
    name: "Module1",
    comment: "Comment about Module1\n\n# Stuff\n@docs FunAlias",
    aliases: [
      { 
        name: "FunAlias",
        comment: "Represents something fun",
        type: "Some.Other.Type msg",
        args: [ "msg" ]
      }
    ],
    values: []
  },
  { 
    name: "Module1.Module2",
    comment: "Comment about Module1.Module2\n\n# Type Alias\n@docs typeAliasOne, typeAliasThree\n\n# First Functions\n@docs funcOne, funcTwo\n\n# More Stuff\n@docs typeAliasTwo, funcThree",
    aliases: [
      { 
        name: "typeAliasOne",
        comment: "Represents something cool",
        type: "Some.Type.Blah msgA msgB",
        args: [ "msgA", "msgB" ]
      },
      { 
        name: "typeAliasTwo",
        comment: "Represents something awesome",
        type: "Some.Type.Model msg",
        args: [ "msg" ]
      },
      {
        name: "typeAliasThree",
        comment: "Links to another Type Alias",
        type: "String -> Module1.Module3.AwesomeAlias",
        args: []
      }
    ],
    values: [
      { 
        name: "funcOne",
        comment: "Here is a comment about funcOne\n\n\tAnd here is a code block.\n\tHere is some more code.\n",
        type: "Module1.FunAlias msg -> String"
      },
      { 
        name: "funcTwo",
        comment: "Here is a comment about funcTwo",
        type: "Int -> Module1.Module3.SomeFunction"
      },
      {
        name: "funcThree",
        comment: "Here is a comment about funcThree",
        type: "Some.Other.FunType -> Int"
      }
    ]
  },
  { name: "Module1.Module3",
    comment: "Comment about Module3\n\n# Things\n@docs AwesomeAlias, SomeFunction",
    aliases: [
      {
        name: "AwesomeAlias",
        comment: "Represents something awesome",
        type: "String",
        args: []
      }
    ],
    values: [
      {
        name: "SomeFunction",
        comment: "Here is some function",
        type: "String -> Bool"
      }
    ]
  }
]