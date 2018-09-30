import * as React from "react"
import {
  Route,
  RouteComponentProps,
} from 'react-router-dom'
import { Documentation } from "./Documentation"
import { ModuleList } from "./ModuleList"
import { ModuleDocumentation } from "../model/ModuleDocumentation"
import { ReadMe } from "./Readme"
import { DocService } from "../services/DocService";

import "../styles/base"

export interface AppProps {
  docService: DocService
}

export interface AppState {
  readme: string,
  docs: Array<ModuleDocumentation>
}

interface MatchProps { moduleName: string }

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      readme: "",
      docs: []
    }
  }
  
  componentDidMount() {
    this.props.docService.fetch().then(response => {
      this.setState(() => ({
        readme: response.readme,
        docs: response.docs
      }))
    })
  }

  render = () => (
    <div>
      <div id="banner">
        <h1>/ Elmer / 4.0.0</h1>
      </div>
      <div id="container">
        <Route exact path={"/"} render={this.showModuleList} />
        <Route exact path={"/"} render={this.showReadme} />
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
      docs={this.state.docs}
      history={props.history}
      currentModule={props.match.params.moduleName}
    />
  )

  showReadme = () => (
    <ReadMe content={this.state.readme} />
  )

  showModule = (props: RouteComponentProps<MatchProps>) => (
    <Documentation allDocs={this.state.docs} docs={ this.docsFor(props.match.params.moduleName) } />
  )

  docsFor(moduleName: string) {
    return this.state.docs.find((doc) => doc.name == moduleName)
  }
}
