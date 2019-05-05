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
  render = () => {
    const [ group1, group2 ] = this.splitGroups(this.props.docs)
    
    return <div id="module-list">
      <div className="stick">
        <h1>Modules</h1>
        <div data-module-list>
          <div>
            { this.showModules(this.props.docs, group1) }
          </div>
          <div>
            { this.showModules(this.props.docs, group2) }
          </div>
        </div>
      </div>
    </div>
  }

  splitGroups = (modules: Array<ModuleDocumentation>): [Array<string>, Array<string>] => {
    const groups = Array.from(this.findGroups(modules).values())
    const group1 = groups.slice(0, Math.ceil(groups.length / 2))
    const group2 = groups.slice(Math.ceil(groups.length / 2))
    return [group1, group2]
  }

  showModules = (docs: Array<ModuleDocumentation>, modulePrefixes: Array<string>) => (
    <PackageVersionContext.Consumer>
      {packageVersion => (
        modulePrefixes.map(this.showModuleGroup(docs, packageVersion, modulePrefixes[0]))
      )}
    </PackageVersionContext.Consumer>
  )

  findGroups = (modules: Array<ModuleDocumentation>): Set<string> => {
    if (modules.length === 0) return new Set()

    const rootLength = modules[0].name.split(".").length + 1

    return modules.reduce((accumulated, current) => {
      return accumulated.add(current.name.split(".").slice(0, rootLength).join("."))
    }, new Set())
  }

  showModuleGroup = (docs: Array<ModuleDocumentation>, packageVersion: PackageVersion, root: string) => (prefix: string) => {
    let items = []
    if (prefix === root) {
      items = docs.filter((m) => m.name === prefix).map(this.showModuleItem(packageVersion))
    } else {
      items = docs.filter((m) => m.name.startsWith(prefix)).map(this.showModuleItem(packageVersion))
    }

    return <ul key={prefix}>
      { items }
    </ul>
  }

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
