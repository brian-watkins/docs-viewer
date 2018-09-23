import { ModuleDocumentation } from "../model/ModuleDocumentation";
import * as Pars from "parsimmon"

export interface InternalType {
  kind: "internal",
  module: string,
  name: string,
  args: Array<string>
}

export interface ExternalType {
  kind: "external",
  name: string,
  args: Array<string>
}

export interface BatchType {
  kind: "batch",
  types: Array<TypeValue>
}

export interface UnknownType {
  kind: "unknown"
}

export type TypeValue = InternalType | ExternalType | BatchType | UnknownType


export const parse = (allDocs: Array<ModuleDocumentation>, typeString: string) : TypeValue => {
  const result = typeDefinitionLanguage(allDocs).typeDefinition.parse(typeString)

  switch (result.status) {
    case true:
      return result.value
    case false:
      return { kind: "unknown" }
  }
}


const typeDefinitionLanguage = (allDocs: Array<ModuleDocumentation>) => (
  Pars.createLanguage({
    word: () => Pars.regexp(/\w+/),
    
    typeName: (p) => (
      Pars.sepBy(p.word, Pars.string(".")).map((typeParts) => {
        return { 
          module: typeParts.length > 1 ? typeParts.slice(0, -1).join(".") : null,
          name: typeParts[ typeParts.length - 1 ],
          args: []
        }
      })
    ),

    typeArgs: (p) => Pars.whitespace.then(p.word).many(),

    nestedTypeDefinition: (p) => (
      p.typeDefinition.wrap(Pars.string("("), Pars.string(")"))
    ),

    typeDesignation: (p) => (
      Pars.seqMap(p.typeName, p.typeArgs, (name, args) => {
        if (name.module && containsType(allDocs, name.module, name.name)) {
          return internalType(name.module, name.name, args)
        }
        return externalType(name.name, args)
      })
    ),

    typeSeparator: () => Pars.seq(Pars.whitespace, Pars.string("->"), Pars.whitespace),

    typeDefinition: (p) => Pars.sepBy(p.nestedTypeDefinition.or(p.typeDesignation), p.typeSeparator).map((types) => {
      if (types.length == 1) return types[0]

      return {
        kind: "batch",
        types
      }
    })

  })
)

const externalType = (name: string, args: Array<string>) : ExternalType => (
  {
    kind: "external",
    name,
    args
  }
)


const internalType = (moduleName: string, name: string, args: Array<string>) : InternalType => (
  {
    kind: "internal",
    module: moduleName,
    name,
    args
  }
)


const containsType = (allDocs: Array<ModuleDocumentation>, moduleName: string, typeName: string): boolean => {
  const module = findByName(allDocs, moduleName)
  if (!module) {
    return false
  }
  
  return hasName(module.values, typeName) || hasName(module.aliases, typeName)
}


const findByName = <T extends {name: string}>(list: Array<T>, name: string) => (
  list.find((m) => m.name === name)
)


const hasName = <T extends {name: string}>(list: Array<T>, name: string) => (
  findByName(list, name) != null
)
