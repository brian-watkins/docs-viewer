import * as React from "react"
import { ModuleDocumentation } from "../model/ModuleDocumentation"
import { History } from "history";


export interface ModuleListProps { 
  docs : Array<ModuleDocumentation>,
  history: History,
  currentModule: string
}

export class ModuleList extends React.Component<ModuleListProps, {}> {
  render = () => (
    <div id="module-list">
      <div className="stick">
        <h1>Modules</h1>
        <ul>
          { this.props.docs.map(this.moduleItem) }
        </ul>
      </div>
    </div>
  )

  moduleItem = (moduleDoc: ModuleDocumentation) => (
    <li 
      key={moduleDoc.name} 
      className={ this.isModuleSelected(moduleDoc.name) ? "selected" : "" } 
      onClick={ () => this.goToPage(`/module/${moduleDoc.name}`) } 
    >
      {moduleDoc.name}
    </li>
  )
  
  isModuleSelected = (name: string) => (
    this.props.currentModule === name
  )

  goToPage = (location: string) => {
    this.props.history.push(location)
  }
}
