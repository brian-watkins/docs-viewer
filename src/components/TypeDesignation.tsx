import * as React from "react"
import { TypeReference } from "./TypeReference";
import { TypeValue, InternalType, ExternalType } from "../parser/TypeDefinitionParser";

export interface TypeDesignationProps {
  value: TypeValue
}

export const TypeDesignation = (props: TypeDesignationProps) => {
  switch (props.value.kind) {
    case "internal":
      return showInternalType(props.value)
    case "external":
      return showExternalType(props.value)
  }
}

const showInternalType = (value: InternalType) => (
  <span className="type-value">
    <TypeReference module={value.module} name={value.name} />
    { value.args.map(showArg) }
  </span>
)

const showExternalType = (value: ExternalType) => (
  <span className="type-value">
    <span>{ value.name }</span>
    { value.args.map(showArg) }
  </span>
)

const showArg = (arg: string, index: number) => (
  <span key={`${arg}-${index}`} className="type-arg">{ arg }</span>
)
