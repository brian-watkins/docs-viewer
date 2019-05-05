import * as React from "react"
import { Link } from "react-router-dom";
import { linkFor } from "../services/LinkProducer";
import { PackageVersionContext } from "./PackageVersionContext";


export interface TypeReferenceProps extends React.HTMLAttributes<HTMLAnchorElement> {
  module: string,
  name: string
}

export const TypeReference = (props: TypeReferenceProps) => (
  <PackageVersionContext.Consumer>
    {packageVersion => (
      <Link {...props} to={linkFor(packageVersion, props.module, props.name)} className="type-name" data-arg-link>
        {props.name}
      </Link>
    )}
  </PackageVersionContext.Consumer>
)