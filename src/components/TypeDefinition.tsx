import * as React from "react"
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import * as TypeDefinitionParser from "../parser/TypeDefinitionParser"
import { TypeDesignation } from "./TypeDesignation";
import { FunctionType } from "./FunctionType";

export interface TypeDefinitionProps {
  docs : Array<ModuleDocumentation>,
  definition : string
}

export const TypeDefinition = (props: TypeDefinitionProps) => {
  const value = TypeDefinitionParser.parse(props.docs, props.definition)
  
  switch (value.kind) {
    case "batch":
      return <FunctionType className="definition">
        { value.types.map((value, index) => <TypeDesignation key={`func-${index}`} value={value} />) }
      </FunctionType>
    default:
      return <span className="definition">
        <TypeDesignation value={ value } />
      </span>
  }
}
