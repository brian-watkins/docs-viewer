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

export interface TupleType {
  kind: "tuple",
  left: TypeValue,
  right: TypeValue
}

export interface BatchType {
  kind: "batch",
  types: Array<TypeValue>
}

export interface UnknownType {
  kind: "unknown"
}

export type TypeValue = InternalType | ExternalType | TupleType | BatchType | UnknownType


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

    namedType: (p) => (
      Pars.seqMap(p.typeName, p.typeArgs, (name, args) => {
        if (name.module && containsType(allDocs, name.module, name.name)) {
          return internalType(name.module, name.name, args)
        }
        return externalType(name.name, args)
      })
    ),

    typeSeparator: () => Pars.seq(Pars.whitespace, Pars.string("->"), Pars.whitespace),

    batchType: (p) => (
      Pars.seqMap(p.simpleType, p.typeSeparator.then(p.simpleType).atLeast(1), (r, rs) => {
        return {
          kind: "batch",
          types: [r].concat(rs)
        }
      })
    ),

    nestedBatchType: (p) => p.batchType.wrap(Pars.string("("), Pars.string(")")),

    tupleType: (p) => (
      Pars.seqMap(p.simpleType, Pars.string(", "), p.simpleType, (left, _, right) => {
        return {
          kind: "tuple",
          left,
          right
        }
      }).wrap(Pars.string("( "), Pars.string(" )"))
    ),

    simpleType: (p) => (
      p.nestedBatchType.or(p.tupleType).or(p.namedType)
    ),

    typeDefinition: (p) => (
      p.batchType.or(p.simpleType)
    )

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
