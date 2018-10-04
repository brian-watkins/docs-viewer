import * as React from "react"
import { Version } from "../model/Version"
import { History } from "history";
import { linkFor } from "../services/LinkProducer";

export interface VersionListProps {
  versions: Array<Version>,
  history: History
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
    <li key={this.printVersion(version)} onClick={() => this.gotoVersionDoc(version)}>/ Elmer / { this.printVersion(version) }</li>
  )

  gotoVersionDoc = (version: Version) => {
    this.props.history.push(linkFor(version))
  }
  
  printVersion = (version: Version) => (
    `${version.major}.${version.minor}.${version.patch}`
  )
}

