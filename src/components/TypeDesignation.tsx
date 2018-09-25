import * as React from "react"
import { TypeReference } from "./TypeReference";
import { TypeValue, InternalType, ExternalType, BatchType, TupleType, TypeVariable } from "../parser/TypeDefinitionParser";
import { FunctionType } from "./FunctionType";
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
    case "batch":
      return showBatchType(props.value)
    case "unknown":
      return null
    default:
      return assertNever(props.value)
  }
}

const showInternalType = (value: InternalType) => (
  <span className="type-designation">
    <TypeReference module={value.module} name={value.name} />
    <TypeArgs args={ value.args } />
  </span>
)

const showExternalType = (value: ExternalType) => (
  <span className="type-designation">
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

const showBatchType = (value: BatchType) => (
  <FunctionType className="nested-function type-designation">
    { value.types.map((val, index) => <TypeDesignation key={`batch-${index}`} value={val}/>) }
  </FunctionType>
)
