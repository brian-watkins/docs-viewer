import * as React from "react"
import { Version } from "../model/Version"
import { linkFor } from "../services/LinkProducer";
import { ListItemLink } from "./ListItemLink"

export interface VersionListProps {
  versions: Array<Version>
}

export class VersionList extends React.Component<VersionListProps> {
  render = () => (
    <div id="versions">
      <ul>
        { this.props.versions.map(this.showVersion) }
      </ul>
    </div>
  )
  
  showVersion = (version: Version) => (
    <ListItemLink key={this.printVersion(version)} to={linkFor(version)}>
      / Elmer / { this.printVersion(version) }
    </ListItemLink>
  )

  printVersion = (version: Version) => (
    `${version.major}.${version.minor}.${version.patch}`
  )
}

