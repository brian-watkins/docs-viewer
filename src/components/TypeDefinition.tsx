import * as React from "react"
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import * as TypeDefinitionParser from "../parser/TypeDefinitionParser"
import { TypeDesignation } from "./TypeDesignation";

export interface TypeDefinitionProps {
  docs : Array<ModuleDocumentation>,
  definition : string
}

export const TypeDefinition = (props: TypeDefinitionProps) => (
  <div className="definition">
    { TypeDefinitionParser.parse(props.docs, props.definition).reduce(joinTypes, []) }
  </div>
)

const joinTypes = (elements : Array<JSX.Element>, typeValue: TypeDefinitionParser.TypeValue, index: number) => {
  if (elements.length > 0) {
    elements.push(typeSeparator(index))
  }
  elements.push(typeDesignation(index, typeValue))
  return elements
}

const typeDesignation = (index:number, typeValue: TypeDefinitionParser.TypeValue) => (
  <TypeDesignation key={`typeItem-${index}`} value={typeValue} />
)

const typeSeparator = (index: number) => (
  <span key={`separator-${index}`} className="separator">-></span>
)
