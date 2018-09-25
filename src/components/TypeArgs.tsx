import * as React from "react"
import { TypeValue } from "../parser/TypeDefinitionParser";
import { TypeDesignation } from "./TypeDesignation";

export interface TypeArgsProps {
  args: Array<TypeValue>
}

export const TypeArgs = (props: TypeArgsProps) => (
  <span data-type-args>
    { props.args.map(showArg) }
  </span>
)

const showArg = (typeValue: TypeValue, index: Number) => {
  switch(typeValue.kind) {
    case "variable":
      return <span key={typeValue.name} className="type-designation">{ typeValue.name }</span>
    default:
      return <TypeDesignation key={`type-arg-${index}`} value={typeValue} />
  }
}
