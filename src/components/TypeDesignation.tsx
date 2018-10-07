import * as React from "react"
import { TypeReference } from "./TypeReference";
import { TypeValue, InternalType, ExternalType, FunctionType, TupleType, TypeVariable } from "../parser/TypeDefinitionParser";
import { FunctionDefinition } from "./FunctionDefinition";
import { TypeArgs } from "./TypeArgs";
import { assertNever } from "../util/Never";


export interface TypeDesignationProps {
  value: TypeValue
}

export const TypeDesignation = (props: TypeDesignationProps) => {
  switch (props.value.kind) {
    case "internal":
      return showInternalType(props.value)
    case "external":
      return showExternalType(props.value)
    case "variable":
      return showTypeVariable(props.value)
    case "tuple":
      return showTupleType(props.value)
    case "function":
      return showFunctionType(props.value)
    case "unknown":
      return null
    default:
      return assertNever(props.value)
  }
}

const showInternalType = (value: InternalType) => (
  <span className="type-designation" data-has-args={value.args.length > 0}>
    <TypeReference module={value.module} name={value.name} />
    <TypeArgs args={ value.args } />
  </span>
)

const showExternalType = (value: ExternalType) => (
  <span className="type-designation" data-has-args={value.args.length > 0}>
    <span className="type-name">{ value.name }</span>
    <TypeArgs args={ value.args } />
  </span>
)

const showTypeVariable = (value: TypeVariable) => (
  <span className="type-designation">
    <TypeArgs args={ [ value ] } />
  </span>
)

const showTupleType = (tuple: TupleType) => (
  <span className="type-designation">
    <span className="tuple-part">
      <TypeDesignation value={tuple.left} />
    </span>
    <span className="tuple-part">
      <TypeDesignation value={tuple.right} />
    </span>
  </span>
)

const showFunctionType = (value: FunctionType) => (
  <FunctionDefinition className="nested-function type-designation" values={value.types} shouldBreak={false} />
)
