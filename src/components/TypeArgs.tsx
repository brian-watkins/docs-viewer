import * as React from "react"

export interface TypeArgsProps {
  args: Array<string>
}

export const TypeArgs = (props: TypeArgsProps) => (
  props.args.length > 0
    ? <span className="type-args">{ props.args.join(" ") }</span>
    : null
)