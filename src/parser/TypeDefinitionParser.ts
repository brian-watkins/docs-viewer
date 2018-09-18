import { ModuleDocumentation } from "../model/ModuleDocumentation";

export interface InternalType {
  kind: "internal",
  module: string,
  name: string,
  args: Array<string>
}

export interface ExternalType {
  kind: "external"
  name: string
  args: Array<string>
}

export type TypeValue = InternalType | ExternalType

export const parse = (allDocs: Array<ModuleDocumentation>, typeString: string) => (
  typeString.split("->")
    .map((t) => {
      const parts = t.trim().split(" ")
      const typePart = parts.shift()
      const lastIndex = typePart.lastIndexOf(".")
      if (lastIndex == -1) {
        return externalType(typePart, [])
      }
      const moduleName = typePart.substring(0, lastIndex)
      const typeName = typePart.substring(lastIndex + 1)
      if (containsType(allDocs, moduleName, typeName)) {
        return internalType(moduleName, typeName, parts)
      } else {
        return externalType(typeName, parts)
      }
    })
)

const externalType = (name: string, args: Array<string>) => {
  return {
    kind: "external",
    name,
    args
  }
}

const internalType = (moduleName: string, name: string, args: Array<string>) => {
  return {
    kind: "internal",
    module: moduleName,
    name,
    args
  }
}

const containsType = (allDocs: Array<ModuleDocumentation>, moduleName: string, typeName: string): boolean => {
  const module = findByName(allDocs, moduleName)
  if (!module) {
    return false
  }
  
  return hasName(module.values, typeName) || hasName(module.aliases, typeName)
}

const findByName = <T extends {name: string}>(list: Array<T>, name: string) => {
  return list.find((m) => m.name === name)
}

const hasName = <T extends {name: string}>(list: Array<T>, name: string) => {
  return findByName(list, name) != null
}