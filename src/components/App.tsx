import * as React from "react"
import {
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom'
import { VersionList } from "./VersionList"
import { DocService } from "../services/DocService";
import { DocumentationPage } from "./DocumentationPage"
import * as VersionHelper from "../parser/VersionParser"
import { Footer } from "./Footer";
import { LatestVersion } from "./LatestVersion"
import { AnalyticsService } from "../services/AnalyticsService";
import "../styles/style"
import { PageViewAnalytics } from "./PageViewAnalytics";
import { Package } from "../model/Package";
import { PackageList } from "./PackageList";

export interface AppProps {
  docService: DocService,
  packages: Array<Package>
  analyticsService: AnalyticsService
}

interface MatchProps {
  package: string,
  version: string,
  moduleName: string
}

export class App extends React.Component<AppProps> {
  render = () => (
    <div>
      <PageViewAnalytics analyticsService={this.props.analyticsService}>
        <Switch>
          <Route exact path="/:package/versions" render={this.showVersions} />
          <Route path="/:package/versions/:version(\d+\.\d+\.\d+)/module/:moduleName" render={this.showDocumentationPage} />
          <Route path="/:package/versions/:version(\d+\.\d+\.\d+)" render={this.showDocumentationPage} />
          <Route path="/:package" render={this.showLatestPackageVersion} />
          <Route path="/" render={this.showPackages} />
        </Switch>
        <Footer />
      </PageViewAnalytics>
    </div>
  )

  showPackages = (props: RouteComponentProps<{}>) => (
    <PackageList packages={this.props.packages} />
  )

  showVersions = (props: RouteComponentProps<MatchProps>) => {
    if (!this.hasPackage(props.match.params.package)) {
      return this.showPackages(props)
    }

    return <VersionList package={this.packageWithName(props.match.params.package)} />
  }

  showLatestPackageVersion = (props: RouteComponentProps<MatchProps>) => {
    if (!this.hasPackage(props.match.params.package)) {
      return this.showPackages(props)
    }

    return <LatestVersion package={this.packageWithName(props.match.params.package)} />
  }

  showDocumentationPage = (props: RouteComponentProps<MatchProps>) => {
    if (!this.hasPackage(props.match.params.package)) {
      return this.showPackages(props)
    }

    if (!this.hasVersion(props.match.params.package, props.match.params.version)) {
      return <LatestVersion package={this.packageWithName(props.match.params.package)} />
    }

    return <DocumentationPage
        docService={this.props.docService}
        packageVersion={{name: props.match.params.package, version: VersionHelper.parse(props.match.params.version)}}
        moduleName={props.match.params.moduleName}
      />
  }

  packageWithName = (name: string): Package => (
    this.props.packages.find((p) => p.name === name)
  )

  hasPackage = (name: string): boolean => (
    this.packageWithName(name) !== undefined
  )

  hasVersion = (packageId: string, version: string): boolean => (
    this.packageWithName(packageId).versions.find((v) => VersionHelper.toString(v) === version) !== undefined
  )
}