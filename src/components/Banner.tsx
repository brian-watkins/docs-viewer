import * as React from "react"
import { Version } from "../model/Version";
import { Link } from "react-router-dom";
import { linkFor } from "../services/LinkProducer";
import * as VersionHelper from "../parser/VersionParser"


export interface BannerProps {
  version: Version
}

export const Banner = (props: BannerProps) => (
  <div id="banner">
    <h1>
      / <Link to="/versions" data-versions-link>Elmer</Link>
      / <Link to={linkFor(props.version)} data-readme-link>
          { VersionHelper.toString(props.version) }
        </Link>
    </h1>
  </div>
)