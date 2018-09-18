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
    <div id="container">
      <Route exact path={"/"} render={this.showModuleList} />
      <Route path={"/module/:moduleName"} render={this.showModuleList} />
      <Route path={"/module/:moduleName"} render={this.showModule} />
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
