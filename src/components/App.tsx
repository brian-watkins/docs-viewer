import * as React from "react"
import {
  Route,
  RouteComponentProps,
} from 'react-router-dom'
import { Documentation } from "./Documentation"
import { ModuleList } from "./ModuleList"
import { ModuleDocumentation } from "../model/ModuleDocumentation"
import "../styles/base"

export interface AppProps { docs : Array<ModuleDocumentation> }

interface MatchProps { moduleName: string }

export class App extends React.Component<AppProps, {}> {
  render = () => (
    <div>
      <div id="banner">
        <h1>/ Elmer / 4.0.0</h1>
      </div>
      <div id="container">
        <Route exact path={"/"} render={this.showModuleList} />
        <Route path={"/module/:moduleName"} render={this.showModuleList} />
        <Route path={"/module/:moduleName"} render={this.showModule} />
      </div>
      <div id="footer">
        Source available at http://github.com/brian-watkins
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
    <Documentation allDocs={this.props.docs} docs={ this.docsFor(props.match.params.moduleName) } />
  )

  docsFor(moduleName: string) {
    return this.props.docs.find((doc) => doc.name == moduleName)
  }
}
