import { ModuleDocumentation } from "../../src/model/ModuleDocumentation"

export const testDocs : Array<ModuleDocumentation> = [
  { name: "Module1",
    aliases: [],
    values: []
  },
  { name: "Module1.Module2",
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
    aliases: [],
    values: []
  }
]