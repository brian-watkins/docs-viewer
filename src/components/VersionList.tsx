import * as React from "react"
import { Version } from "../model/Version"
import { linkFor } from "../services/LinkProducer";
import { ListItemLink } from "./ListItemLink"
import * as VersionHelper from "../parser/VersionParser"
import { Package } from "../model/Package";

export interface VersionListProps {
  package: Package
}

export class VersionList extends React.Component<VersionListProps> {
  render = () => (
    <div id="versions">
      <h1>/ <span className="package">{this.props.package.displayName}</span> / Versions</h1>
      <ul>
        { this.props.package.versions.map(this.showVersion) }
      </ul>
    </div>
  )
  
  showVersion = (version: Version) => (
    <ListItemLink key={ VersionHelper.toString(version) } to={ linkFor(this.props.package.atVersion(version)) }>
      <h1>{ VersionHelper.toString(version) }</h1>
    </ListItemLink>
  )
}

