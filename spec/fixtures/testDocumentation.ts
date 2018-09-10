import { ModuleDocumentation } from "../../src/model/ModuleDocumentation"

export const testDocs : Array<ModuleDocumentation> = [
  { name: "Module1",
    values: []
  },
  { name: "Module1.Module2",
    values: [
      { name: "funcOne" },
      { name: "funcTwo" }
    ]
  },
  { name: "Module1.Module3",
    values: []
  }
]