import * as React from "react"
import { TypeValue } from "../parser/TypeDefinitionParser";
import { TypeDesignation } from "./TypeDesignation";
import { Version } from "../model/Version";

export interface TypeArgsProps {
  version: Version,
  args: Array<TypeValue>
}

export const TypeArgs = (props: TypeArgsProps) => (
  <span data-type-args>
    { props.args.map((a, index) => showArg(props.version, a, index)) }
  </span>
)

const showArg = (version: Version, typeValue: TypeValue, index: Number) => {
  switch(typeValue.kind) {
    case "variable":
      return <span key={typeValue.name} className="type-designation">{ typeValue.name }</span>
    default:
      return <TypeDesignation version={version} key={`type-arg-${index}`} value={typeValue} />
  }
}
