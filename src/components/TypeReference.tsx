import * as React from "react"
import { Link } from "react-router-dom";

export interface TypeReferenceProps extends React.HTMLAttributes<HTMLAnchorElement> {
  module: string,
  name: string
}

export const TypeReference = (props: TypeReferenceProps) => (
  <Link {...props} to={`/module/${props.module}#${props.name}`} data-arg-link>
    {props.name}
  </Link>
)