import * as React from "react"
import { TypeValue } from "../parser/TypeDefinitionParser";

export interface FunctionTypeProps {
  children: Array<JSX.Element>,
  className: string
}

export const FunctionType = (props: FunctionTypeProps) => {
  return <span className={ props.className }>{ props.children.reduce(joinTypes, []) }</span>
}

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
