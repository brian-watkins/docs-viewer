import * as React from "react"
import { TypeReference } from "./TypeReference";
import { TypeValue, InternalType, ExternalType, BatchType, TupleType, TypeVariable } from "../parser/TypeDefinitionParser";
import { FunctionType } from "./FunctionType";
import { TypeArgs } from "./TypeArgs";
import { assertNever } from "../util/Never";
import { Version } from "../model/Version";

export interface TypeDesignationProps {
  version: Version,
  value: TypeValue
}

export const TypeDesignation = (props: TypeDesignationProps) => {
  switch (props.value.kind) {
    case "internal":
      return showInternalType(props.version, props.value)
    case "external":
      return showExternalType(props.version, props.value)
    case "variable":
      return showTypeVariable(props.version, props.value)
    case "tuple":
      return showTupleType(props.version, props.value)
    case "batch":
      return showBatchType(props.version, props.value)
    case "unknown":
      return null
    default:
      return assertNever(props.value)
  }
}

const showInternalType = (version: Version, value: InternalType) => (
  <span className="type-designation" data-has-args={value.args.length > 0}>
    <TypeReference version={version} module={value.module} name={value.name} />
    <TypeArgs version={version} args={ value.args } />
  </span>
)

const showExternalType = (version: Version, value: ExternalType) => (
  <span className="type-designation" data-has-args={value.args.length > 0}>
    <span className="type-name">{ value.name }</span>
    <TypeArgs version={version} args={ value.args } />
  </span>
)

const showTypeVariable = (version: Version, value: TypeVariable) => (
  <span className="type-designation">
    <TypeArgs version={version} args={ [ value ] } />
  </span>
)

const showTupleType = (version: Version, tuple: TupleType) => (
  <span className="type-designation">
    <span className="tuple-part">
      <TypeDesignation version={version} value={tuple.left} />
    </span>
    <span className="tuple-part">
      <TypeDesignation version={version} value={tuple.right} />
    </span>
  </span>
)

const showBatchType = (version:Version, value: BatchType) => (
  <FunctionType className="nested-function type-designation" version={version} values={value.types} shouldBreak={false} />
)
