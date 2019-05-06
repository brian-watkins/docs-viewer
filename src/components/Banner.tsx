import * as React from "react"
import { Link } from "react-router-dom";
import { linkFor } from "../services/LinkProducer";
import * as VersionHelper from "../parser/VersionParser"
import { PackageVersionContext } from "./PackageVersionContext"
import { Package } from "../model/Package";


export const Banner = () => (
  <PackageVersionContext.Consumer>
    {packageVersion => (
      <div id="banner">
        <h1>
          / <Link to={`/${packageVersion.name}/versions`} data-versions-link>{Package.displayName(packageVersion.name)}</Link> / <Link to={linkFor(packageVersion)} data-readme-link>
              { VersionHelper.toString(packageVersion.version) }
            </Link>
        </h1>
      </div>
    )}
  </PackageVersionContext.Consumer>
)