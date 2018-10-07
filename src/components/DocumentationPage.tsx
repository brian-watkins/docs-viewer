import * as React from "react"
import { Version } from "../model/Version";
import { ModuleList } from "./ModuleList";
import { ReadMe } from "./Readme";
import { Documentation } from "./Documentation";
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { DocService } from "../services/DocService";
import { Banner } from "./Banner";
import { VersionContext } from "./VersionContext"


export interface DocumentationPageProps {
  docService: DocService,
  version: Version,
  moduleName?: string,
}

export interface DocumentationPageState {
  readme: string,
  docs: Array<ModuleDocumentation>
}

export class DocumentationPage extends React.Component<DocumentationPageProps, DocumentationPageState> {
  constructor(props: DocumentationPageProps) {
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
    <VersionContext.Provider value={this.props.version}>
      <div>
        <Banner />
        <div id="container">
          { this.renderPage() }
        </div>
      </div>
    </VersionContext.Provider>
  )

  renderPage() {
    if (this.props.moduleName === undefined) {
      return this.readmePage()
    }

    if (this.state.docs.length > 0) {
      const moduleDocs = this.docsFor(this.props.moduleName)
      if (moduleDocs) {
        return this.documentationPage(moduleDocs)
      } else {
        return this.readmePage()
      }
    }
    
    return null
  }

  readmePage = () => (
    [
      <ReadMe key="readme" content={this.state.readme} />,
      this.moduleList()
    ]
  )

  documentationPage = (moduleDocs: ModuleDocumentation) => (
    [
      <Documentation 
        key="readme" 
        allDocs={this.state.docs} 
        docs={ moduleDocs }
      />,
      this.moduleList()
    ]
  )

  moduleList = () => (
    <ModuleList 
        key="module-list"
        docs={this.state.docs}
        currentModule={this.props.moduleName}
      />
  )

  docsFor(moduleName: string) {
    return this.state.docs.find((doc) => doc.name == moduleName)
  }
}