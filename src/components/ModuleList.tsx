import * as React from "react"
import { ModuleDocumentation } from "../model/ModuleDocumentation"
import { linkFor } from "../services/LinkProducer";
import { ListItemLink } from "./ListItemLink";
import { PackageVersionContext } from "./PackageVersionContext";
import { PackageVersion } from "../model/PackageVersion";


export interface ModuleListProps { 
  docs : Array<ModuleDocumentation>,
  currentModule: string
}

export class ModuleList extends React.Component<ModuleListProps, {}> {
  render = () => (
      <div id="module-list">
        <div className="stick">
          <h1>Modules</h1>
          { this.showModules() }
        </div>
      </div>
  )

  showModules = () => (
    <PackageVersionContext.Consumer>
      {packageVersion => (
        <ul>
          { this.props.docs.map(this.showModuleItem(packageVersion)) }
        </ul>
      )}
    </PackageVersionContext.Consumer>
  )

  showModuleItem = (packageVersion: PackageVersion) => (moduleDoc: ModuleDocumentation) => (
    <ListItemLink
      key={moduleDoc.name} 
      to={linkFor(packageVersion, moduleDoc.name)}
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
