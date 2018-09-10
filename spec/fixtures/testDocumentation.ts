import { ModuleDocumentation } from "../../src/model/ModuleDocumentation"

export const testDocs : Array<ModuleDocumentation> = [
  { name: "Module1",
    comment: "Comment about Module1",
    aliases: [],
    values: []
  },
  { name: "Module1.Module2",
    comment: "Comment about Module1.Module2",
    aliases: [
      { name: "typeAliasOne" },
      { name: "typeAliasTwo" }
    ],
    values: [
      { name: "funcOne" },
      { name: "funcTwo" }
    ]
  },
  { name: "Module1.Module3",
    comment: "Comment about Module3",
    aliases: [],
    values: []
  }
]