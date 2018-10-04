import * as React from "react"
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import * as TypeDefinitionParser from "../parser/TypeDefinitionParser"
import { TypeDesignation } from "./TypeDesignation";
import { FunctionType } from "./FunctionType";
import { Version } from "../model/Version";

export interface TypeDefinitionProps {
  version: Version,
  docs : Array<ModuleDocumentation>,
  definition : string
}

export const TypeDefinition = (props: TypeDefinitionProps) => {
  const value = TypeDefinitionParser.parse(props.docs, props.definition)

  switch (value.kind) {
    case "batch":
      return <FunctionType version={props.version} className="definition" values={value.types} shouldBreak={props.definition.length > 60} />
    default:
      return <span className="definition">
        <TypeDesignation version={props.version} value={ value } />
      </span>
  }
}
