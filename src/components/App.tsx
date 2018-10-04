import * as React from "react"
import {
  Route,
  Switch,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom'
import { Documentation } from "./Documentation"
import { ModuleList } from "./ModuleList"
import { ModuleDocumentation } from "../model/ModuleDocumentation"
import { VersionList } from "./VersionList"
import { ReadMe } from "./Readme"
import { Show } from "../util/Show"
import { DocService } from "../services/DocService";
import { Link } from "react-router-dom";
import { Version } from "../model/Version";
import { VersionPage } from "./VersionPage"

import "../styles/base"

export interface AppProps {
  docService: DocService,
  versions: Array<Version>
}

// export interface AppState {
//   readme: string,
//   docs: Array<ModuleDocumentation>,
//   version: Version
// }

interface MatchProps {
  version: string,
  moduleName: string
}

export class App extends React.Component<AppProps> {
  // constructor(props: AppProps) {
  //   super(props)
  //   this.state = {
  //     version: props.versions[0],
  //     readme: "",
  //     docs: []
  //   }
  // }
  
  // componentDidUpdate(prevProps: AppProps, prevState: AppState) {
  //   if (prevState.version !== this.state.version) {
  //     this.props.docService.fetch(this.state.version).then(response => {
  //       this.setState(() => ({
  //         readme: response.readme,
  //         docs: response.docs
  //       }))
  //     })  
  //   }
  // }

  render = () => (
    <Switch>
      <Route exact path="/versions" render={this.showVersions} />
      <Route path="/versions/:version/module/:moduleName" render={this.showVersionPage} />
      <Route path="/versions/:version" render={this.showVersionPage} />
      <Redirect to="/versions/4.0.0" />
    </Switch>
  )

  showVersions = (props: RouteComponentProps<{}>) => (
    <VersionList versions={this.props.versions} history={props.history} />
  )

  showVersionPage = (props: RouteComponentProps<MatchProps>) => (
    <VersionPage
      docService={this.props.docService}
      history={props.history}
      version={this.parseVersion(props.match.params.version)}
      moduleName={props.match.params.moduleName}
    />
  )

  parseVersion = (versionString: string) => {
    const parts = versionString.split(".")
    return {
      major: Number(parts[0]),
      minor: Number(parts[1]),
      patch: Number(parts[2])
    }
  }

  //basically this function knows what version and so it needs to fetch the docs for that version
  //probably should make module home a component that does the fetching and stores in its internal state I guess
  // showModuleHome = (props: RouteComponentProps<MatchProps>) => (
    // <div>
    //   <div id="banner">
    //     <h1>/ <Link to="/versions" data-versions-link>Elmer</Link> / <Link to="/">{props.match.params.version}</Link></h1>
    //   </div>
    //   <div id="container">
    //     <Route exact path="/versions/:version" render={this.showReadme} />
    //     <Route exact path="/versions/:version" render={this.showModuleList} />
    //     <Show if={this.state.docs.length > 0}>
    //       <Route path="/versions/:version/module/:moduleName" render={this.showModule} />
    //       <Route path="/versions/:version/module/:moduleName" render={this.showModuleList} />
    //     </Show>
    //   </div>
    //   <div id="footer">
    //     Source available at http://github.com/brian-watkins
    //   </div>
    // </div>
  // )

  // showModuleList = (props: RouteComponentProps<MatchProps>) => (
  //   <ModuleList
  //     docs={this.state.docs}
  //     history={props.history}
  //     currentModule={props.match.params.moduleName}
  //   />
  // )

  // showReadme = () => (
  //   <ReadMe content={this.state.readme} />
  // )

  // showModule = (props: RouteComponentProps<MatchProps>) => (
  //   <Documentation allDocs={this.state.docs} docs={ this.docsFor(props.match.params.moduleName) } />
  // )

  // docsFor(moduleName: string) {
  //   return this.state.docs.find((doc) => doc.name == moduleName)
  // }
}
