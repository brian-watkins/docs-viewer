import * as React from "react"
import { Version } from "../model/Version";
import { Link } from "react-router-dom";
import { Show } from "../util/Show";
import { ModuleList } from "./ModuleList";
import { ReadMe } from "./Readme";
import { Documentation } from "./Documentation";
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { DocService } from "../services/DocService";
import { linkFor } from "../services/LinkProducer";
import * as VersionHelper from "../parser/VersionParser"

export interface VersionPageProps {
  docService: DocService,
  version: Version,
  moduleName?: string,
}

export interface VersionPageState {
  readme: string,
  docs: Array<ModuleDocumentation>
}

export class VersionPage extends React.Component<VersionPageProps, VersionPageState> {
  constructor(props: VersionPageProps) {
    super(props)

    this.state = {
      readme: "",
      docs: []
    }
  }

  componentDidMount() {
    this.props.docService.fetch(this.props.version).then(response => {
      this.setState(() => ({
        readme: response.readme,
        docs: response.docs
      }))
    })
  }

  render = () => (
    <div>
      <div id="banner">
        <h1>
          / <Link to="/versions" data-versions-link>Elmer</Link>
          / <Link to={linkFor(this.props.version)} data-readme-link>
              { VersionHelper.toString(this.props.version) }
            </Link>
        </h1>
      </div>
      <div id="container">
        <Show if={this.props.moduleName === undefined}>
          <ReadMe content={this.state.readme} />
          <ModuleList
            docs={this.state.docs}
            version={this.props.version}
            currentModule={this.props.moduleName}
          />
        </Show>
        <Show if={this.state.docs.length > 0 && this.props.moduleName !== undefined}>
          <Documentation version={this.props.version} allDocs={this.state.docs} docs={ this.docsFor(this.props.moduleName) } />
          <ModuleList
            docs={this.state.docs}
            version={this.props.version}
            currentModule={this.props.moduleName}
          />
        </Show>
      </div>
      <div id="footer">
        Source available at http://github.com/brian-watkins
      </div>
    </div>
  )

  // showModuleList = (props: RouteComponentProps<MatchProps>) => (
  //   <ModuleList
  //     docs={this.state.docs}
  //     history={props.history}
  //     currentModule={this.props.moduleName}
  //   />
  // )

  // showReadme = () => (
  //   <ReadMe content={this.state.readme} />
  // )

  // showModule = (props: RouteComponentProps<MatchProps>) => (
  //   <Documentation allDocs={this.state.docs} docs={ this.docsFor(props.match.params.moduleName) } />
  // )

  docsFor(moduleName: string) {
    return this.state.docs.find((doc) => doc.name == moduleName)
  }
}