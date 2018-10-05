import * as React from "react"
import {
  Route,
  Switch,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom'
import { VersionList } from "./VersionList"
import { DocService } from "../services/DocService";
import { Version } from "../model/Version";
import { VersionPage } from "./VersionPage"
import * as VersionHelper from "../parser/VersionParser"

import "../styles/base"
import { Footer } from "./Footer";

export interface AppProps {
  docService: DocService,
  versions: Array<Version>
}

interface MatchProps {
  version: string,
  moduleName: string
}

export class App extends React.Component<AppProps> {
  render = () => (
    <div>
      <Switch>
        <Route exact path="/versions" render={this.showVersions} />
        <Route path="/versions/:version/module/:moduleName" render={this.showVersionPage} />
        <Route path="/versions/:version" render={this.showVersionPage} />
        <Redirect to="/versions/4.0.0" />
      </Switch>
      <Footer />
    </div>
  )

  showVersions = (props: RouteComponentProps<{}>) => (
    <VersionList versions={this.props.versions} />
  )

  showVersionPage = (props: RouteComponentProps<MatchProps>) => (
    <VersionPage
      docService={this.props.docService}
      version={VersionHelper.parse(props.match.params.version)}
      moduleName={props.match.params.moduleName}
    />
  )
}
