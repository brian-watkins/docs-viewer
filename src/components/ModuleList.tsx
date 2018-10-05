import * as React from "react"
import { ModuleDocumentation } from "../model/ModuleDocumentation"
import { Version } from "../model/Version";
import { linkFor } from "../services/LinkProducer";
import { ListItemLink } from "./ListItemLink";
import { VersionContext } from "./VersionContext";


export interface ModuleListProps { 
  docs : Array<ModuleDocumentation>,
  currentModule: string
}

export class ModuleList extends React.Component<ModuleListProps, {}> {
  render = () => (
    <VersionContext.Consumer>
      {version => (
        <div id="module-list">
          <div className="stick">
            <h1>Modules</h1>
            <ul>
              { this.props.docs.map(this.moduleItem(version)) }
            </ul>
          </div>
        </div>
      )}
    </VersionContext.Consumer>
  )

  moduleItem = (version: Version) => (moduleDoc: ModuleDocumentation) => (
    <ListItemLink
      key={moduleDoc.name} 
      to={linkFor(version, moduleDoc.name)}
      className={ this.isModuleSelected(moduleDoc.name) ? "selected" : "" }
      data-name={moduleDoc.name}
    >
      <span>{moduleDoc.name}</span>
    </ListItemLink>
  )
  
  isModuleSelected = (name: string) => (
    this.props.currentModule === name
  )
}
