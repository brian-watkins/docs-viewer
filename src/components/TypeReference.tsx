import * as React from "react"
import { Link } from "react-router-dom";
import { Version } from "../model/Version";
import { linkFor } from "../services/LinkProducer";

export interface TypeReferenceProps extends React.HTMLAttributes<HTMLAnchorElement> {
  version: Version,
  module: string,
  name: string
}

export const TypeReference = (props: TypeReferenceProps) => (
  <Link {...props} to={linkFor(props.version, props.module, props.name)} className="type-name" data-arg-link>
    {props.name}
  </Link>
)