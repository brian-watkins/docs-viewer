import * as React from "react"
import { Version } from "../model/Version";
import { Show } from "../util/Show";
import { ModuleList } from "./ModuleList";
import { ReadMe } from "./Readme";
import { Documentation } from "./Documentation";
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { DocService } from "../services/DocService";
import { Banner } from "./Banner";


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
      <Banner version={this.props.version} />
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
    </div>
  )

  docsFor(moduleName: string) {
    return this.state.docs.find((doc) => doc.name == moduleName)
  }
}