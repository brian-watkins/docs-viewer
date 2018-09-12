import { ModuleDocumentation } from "../../src/model/ModuleDocumentation"

export const testDocs : Array<ModuleDocumentation> = [
  { 
    name: "Module1",
    comment: "Comment about Module1",
    aliases: [],
    values: []
  },
  { 
    name: "Module1.Module2",
    comment: "Comment about Module1.Module2\n\n#First Functions\n@docs funcOne, funcTwo\n\n#Second Functions\n@docs funcThree",
    aliases: [
      { 
        name: "typeAliasOne",
        comment: "",
        type: ""
      },
      { 
        name: "typeAliasTwo",
        comment: "",
        type: ""
      }
    ],
    values: [
      { 
        name: "funcOne",
        comment: "Here is a comment about funcOne",
        type: "String -> String"
      },
      { 
        name: "funcTwo",
        comment: "Here is a comment about funcTwo",
        type: "Int -> String"
      },
      {
        name: "funcThree",
        comment: "Here is a comment about funcThree",
        type: "Int -> Int"
      }
    ]
  },
  { name: "Module1.Module3",
    comment: "Comment about Module3",
    aliases: [],
    values: []
  }
]