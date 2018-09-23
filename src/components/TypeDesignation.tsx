import * as React from "react"
import { TypeReference } from "./TypeReference";
import { TypeValue, InternalType, ExternalType, BatchType } from "../parser/TypeDefinitionParser";
import { FunctionType } from "./FunctionType";
import { TypeArgs } from "./TypeArgs";

export interface TypeDesignationProps {
  value: TypeValue
}

export const TypeDesignation = (props: TypeDesignationProps) => {
  switch (props.value.kind) {
    case "internal":
      return showInternalType(props.value)
    case "external":
      return showExternalType(props.value)
    case "batch":
      return showBatchType("type-designation", props.value)
    case "unknown":
      return null
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

const showBatchType = (className: string, value: BatchType) => (
  <FunctionType className={className}>
    { value.types.map((val, index) => <TypeDesignation key={`batch-${index}`} value={val}/>) }
  </FunctionType>
)
