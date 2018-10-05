import * as React from "react"
import { Version } from "../model/Version"
import { linkFor } from "../services/LinkProducer";
import { ListItemLink } from "./ListItemLink"
import * as VersionHelper from "../parser/VersionParser"

export interface VersionListProps {
  versions: Array<Version>
}

export class VersionList extends React.Component<VersionListProps> {
  render = () => (
    <div id="versions">
      <h1>/ Elmer / Versions</h1>
      <ul>
        { this.props.versions.map(this.showVersion) }
      </ul>
    </div>
  )
  
  showVersion = (version: Version) => (
    <ListItemLink key={ VersionHelper.toString(version) } to={ linkFor(version) }>
      <h1>{ VersionHelper.toString(version) }</h1>
    </ListItemLink>
  )
}

