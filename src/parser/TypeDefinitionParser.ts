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

export interface SaturatedType {
  kind: "saturated",
  parent: TypeValue,
  types: Array<TypeValue>
}

export interface TypeVariable {
  kind: "variable",
  name: string
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

export type TypeValue = InternalType | ExternalType | TypeVariable | TupleType | BatchType | SaturatedType | UnknownType


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

    typeSeparator: () => Pars.seq(Pars.whitespace, Pars.string("->"), Pars.whitespace),

    batchType: (p) => (
      Pars.seqMap(p.type, p.typeSeparator.then(p.type).atLeast(1), (r, rs) => {
        return {
          kind: "batch",
          types: [r].concat(rs)
        }
      })
    ),

    nestedBatchType: (p) => p.batchType.wrap(Pars.string("("), Pars.string(")")),

    tupleType: (p) => (
      Pars.seqMap(p.type, Pars.string(", "), p.type, (left, _, right) => {
        return {
          kind: "tuple",
          left,
          right
        }
      }).wrap(Pars.string("( "), Pars.string(" )"))
    ),

    typeVariable: (p) => (
      Pars.regexp(/\w+/).map((name) => {
        return {
          kind: "variable",
          name
        }
      })
    ),

    typeName: (p) => (
      Pars.seqMap(p.word, Pars.string(".").then(p.word).atLeast(1), (first, remaining) => {
        const typeParts = [first].concat(remaining)
        return {
          module: typeParts.length > 1 ? typeParts.slice(0, -1).join(".") : null,
          name: typeParts[ typeParts.length - 1],
        }
      })
    ),

    complexType: (p) => (
      Pars.seqMap(p.typeName, Pars.whitespace.then(p.typeName).atLeast(1), (type, remaining) => {
        return {
          kind: "saturated",
          parent: externalType(type.name, []),
          types: remaining.map((t) => externalType(t.name, []))
        }
      })
    ),

    simpleType: (p) => (
      Pars.seqMap(p.typeName, Pars.whitespace.then(p.word).many(), (t, args) => {
        if (t.module && containsType(allDocs, t.module, t.name)) {
          return internalType(t.module, t.name, args)
        }
        return externalType(t.name, args)
      })
    ),

    type: (p) => (
      p.nestedBatchType
        .or(p.tupleType)
        .or(Pars.lookahead(p.complexType).then(p.complexType))
        .or(Pars.lookahead(p.simpleType).then(p.simpleType))
        .or(p.typeVariable)
    ),

    typeDefinition: (p) => (
      p.batchType.or(p.type)
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
