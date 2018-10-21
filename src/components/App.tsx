import * as React from "react"
import {
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom'
import { VersionList } from "./VersionList"
import { DocService } from "../services/DocService";
import { Version } from "../model/Version";
import { DocumentationPage } from "./DocumentationPage"
import * as VersionHelper from "../parser/VersionParser"
import { Footer } from "./Footer";
import { LatestVersion } from "./LatestVersion"
import { AnalyticsService } from "../services/AnalyticsService";
import "../styles/style"
import { PageViewAnalytics } from "./PageViewAnalytics";

export interface AppProps {
  docService: DocService,
  versions: Array<Version>,
  analyticsService: AnalyticsService
}

interface MatchProps {
  version: string,
  moduleName: string
}

export class App extends React.Component<AppProps> {
  render = () => (
    <div>
      <PageViewAnalytics analyticsService={this.props.analyticsService}>
        <Switch>
          <Route exact path="/versions" render={this.showVersions} />
          <Route path="/versions/:version(\d+\.\d+\.\d+)/module/:moduleName" render={this.showDocumentationPage} />
          <Route path="/versions/:version(\d+\.\d+\.\d+)" render={this.showDocumentationPage} />
          <LatestVersion versions={this.props.versions} />
        </Switch>
        <Footer />
      </PageViewAnalytics>
    </div>
  )

  showVersions = (props: RouteComponentProps<{}>) => (
    <VersionList versions={this.props.versions} />
  )

  showDocumentationPage = (props: RouteComponentProps<MatchProps>) => {
    if (!this.hasVersion(props.match.params.version)) {
      return <LatestVersion versions={this.props.versions} />
    }

    return <DocumentationPage
        docService={this.props.docService}
        version={VersionHelper.parse(props.match.params.version)}
        moduleName={props.match.params.moduleName}
      />
  }

  hasVersion = (version: string): boolean => (
    this.props.versions.find((v) => VersionHelper.toString(v) === version) !== undefined
  )
}