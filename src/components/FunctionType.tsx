import * as React from "react"
import { TypeValue } from "../parser/TypeDefinitionParser";
import { TypeDesignation } from "./TypeDesignation";
import { Version } from "../model/Version";

export interface FunctionTypeProps {
  values: Array<TypeValue>,
  version: Version,
  className: string,
  shouldBreak: boolean
}

export const FunctionType = (props: FunctionTypeProps) => (
  <span className={ props.className } data-should-break={props.shouldBreak}>
    { props.values.map((val, index) => <TypeDesignation version={props.version} key={`batch-${index}`} value={val}/>).reduce(joinTypes, []) }
  </span>
)

const joinTypes = (elements : Array<JSX.Element>, element: JSX.Element, index: number) => {
  if (elements.length > 0) {
    elements.push(typeSeparator(index))
  }
  elements.push(element)
  return elements
}

const typeSeparator = (index: number) => (
  <span key={`separator-${index}`} className="separator">-></span>
)
