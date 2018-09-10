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
    comment: "Comment about Module1.Module2\n\n@docs funcOne, funcTwo",
    aliases: [
      { 
        name: "typeAliasOne",
        comment: ""
      },
      { 
        name: "typeAliasTwo",
        comment: ""
      }
    ],
    values: [
      { 
        name: "funcOne",
        comment: "Here is a comment about funcOne"
      },
      { 
        name: "funcTwo",
        comment: "Here is a comment about funcTwo"
      }
    ]
  },
  { name: "Module1.Module3",
    comment: "Comment about Module3",
    aliases: [],
    values: []
  }
]