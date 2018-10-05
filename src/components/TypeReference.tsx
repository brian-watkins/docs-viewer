import * as React from "react"
import { Link } from "react-router-dom";
import { linkFor } from "../services/LinkProducer";
import { VersionContext } from "./VersionContext";


export interface TypeReferenceProps extends React.HTMLAttributes<HTMLAnchorElement> {
  module: string,
  name: string
}

export const TypeReference = (props: TypeReferenceProps) => (
  <VersionContext.Consumer>
    {version => (
      <Link {...props} to={linkFor(version, props.module, props.name)} className="type-name" data-arg-link>
        {props.name}
      </Link>
    )}
  </VersionContext.Consumer>
)