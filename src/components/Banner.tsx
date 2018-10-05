import * as React from "react"
import { Link } from "react-router-dom";
import { linkFor } from "../services/LinkProducer";
import * as VersionHelper from "../parser/VersionParser"
import { VersionContext } from "./VersionContext"


export const Banner = () => (
  <VersionContext.Consumer>
    {version => (
      <div id="banner">
        <h1>
          / <Link to="/versions" data-versions-link>Elmer</Link> / <Link to={linkFor(version)} data-readme-link>
              { VersionHelper.toString(version) }
            </Link>
        </h1>
      </div>
    )}
  </VersionContext.Consumer>
)