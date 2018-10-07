import * as React from "react"
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import * as TypeDefinitionParser from "../parser/TypeDefinitionParser"
import { TypeDesignation } from "./TypeDesignation";
import { FunctionDefinition } from "./FunctionDefinition";


export interface TypeDefinitionProps {
  docs : Array<ModuleDocumentation>,
  definition : string
}

export const TypeDefinition = (props: TypeDefinitionProps) => {
  const value = TypeDefinitionParser.parse(props.docs, props.definition)

  switch (value.kind) {
    case "function":
      return <FunctionDefinition className="definition" values={value.types} shouldBreak={props.definition.length > 60} />
    default:
      return <span className="definition">
        <TypeDesignation value={ value } />
      </span>
  }
}
