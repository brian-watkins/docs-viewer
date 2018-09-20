import * as React from "react"
import {
  Route,
  RouteComponentProps,
} from 'react-router-dom'
import { ShowModule } from "./ShowModule"
import { ModuleList } from "./ModuleList"
import { ModuleDocumentation } from "../model/ModuleDocumentation"


export interface AppProps { docs : Array<ModuleDocumentation> }

interface MatchProps { moduleName: string }

export class App extends React.Component<AppProps, {}> {
  render = () => (
    <div>
      <div id="container">
        <div id="banner">
          <h1>Elmer 4.0.0</h1>
          <ul>
            <li>Elmer 4.0.0</li>
            <li>Elmer 3.3.1</li>
            <li>Elmer 3.3.0</li>
            <li>Elmer 3.2.0</li>
            <li>Elmer 3.1.0</li>
          </ul>
        </div>
        <Route exact path={"/"} render={this.showModuleList} />
        <Route path={"/module/:moduleName"} render={this.showModuleList} />
        <Route path={"/module/:moduleName"} render={this.showModule} />
      </div>
    </div>
    
  )

  showModuleList = (props: RouteComponentProps<MatchProps>) => (
    <ModuleList
      docs={this.props.docs}
      history={props.history}
      currentModule={props.match.params.moduleName}
    />
  )

  showModule = (props: RouteComponentProps<MatchProps>) => (
    <ShowModule allDocs={this.props.docs} docs={ this.docsFor(props.match.params.moduleName) } />
  )

  docsFor(moduleName: string) {
    return this.props.docs.find((doc) => doc.name == moduleName)
  }
}
