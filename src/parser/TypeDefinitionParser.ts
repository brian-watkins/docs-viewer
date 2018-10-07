import { ModuleDocumentation } from "../model/ModuleDocumentation";
import * as Pars from "parsimmon"

export interface InternalType {
  kind: "internal",
  module: string,
  name: string,
  args: Array<TypeValue>
}

export interface ExternalType {
  kind: "external",
  name: string,
  args: Array<TypeValue>
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

export interface FunctionType {
  kind: "function",
  types: Array<TypeValue>
}

export interface UnknownType {
  kind: "unknown"
}

export type TypeValue = InternalType | ExternalType | TypeVariable | TupleType | FunctionType | UnknownType

interface TypeName {
  module: string,
  name: string
}


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

    functionTypeSeparator: () => Pars.seq(Pars.whitespace, Pars.string("->"), Pars.whitespace),

    functionType: (p) => (
      Pars.seqMap(p.typeValue, p.functionTypeSeparator.then(p.typeValue).atLeast(1), (r, rs) => {
        return {
          kind: "function",
          types: [r].concat(rs)
        }
      })
    ),

    nestedFunctionType: (p) => p.functionType.wrap(Pars.string("("), Pars.string(")")),

    tupleType: (p) => (
      Pars.seqMap(p.typeValue, Pars.string(", "), p.typeValue, (left, _, right) => {
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

    atomicTypeLabel: (p) => (
      p.typeName.map((type) => typeLabel(allDocs, type, []))
    ),

    typeArgument: (p) => (
      p.nestedTypeLabel.or(p.nestedFunctionType).or(p.tupleType).or(p.atomicTypeLabel).or(p.typeVariable).or(p.unitType)
    ),

    typeLabel: (p) => (
      Pars.seqMap(p.typeName, Pars.whitespace.then(p.typeArgument).many(), (type, args) => {
        return typeLabel(allDocs, type, args)
      })
    ),

    nestedTypeLabel: (p) => p.typeLabel.wrap(Pars.string("("), Pars.string(")")),

    unitType: () => Pars.string("()").map(() => externalType("()", [])),

    typeValue: (p) => (
      p.nestedFunctionType
        .or(p.tupleType)
        .or(p.typeLabel)
        .or(p.typeVariable)
        .or(p.unitType)
    ),

    typeDefinition: (p) => (
      p.functionType.or(p.typeValue)
    )

  })
)

const typeLabel = (allDocs: Array<ModuleDocumentation>, type: TypeName, args: Array<TypeValue>): TypeValue => {
  if (type.module && containsType(allDocs, type.module, type.name)) {
    return internalType(type.module, type.name, args)
  }
  return externalType(type.name, args)
}

const externalType = (name: string, args: Array<TypeValue>) : ExternalType => (
  {
    kind: "external",
    name,
    args
  }
)


const internalType = (moduleName: string, name: string, args: Array<TypeValue>) : InternalType => (
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
