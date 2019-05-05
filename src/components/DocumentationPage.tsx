import * as React from "react"
import { ModuleList } from "./ModuleList";
import { ReadMe } from "./Readme";
import { Documentation } from "./Documentation";
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { DocService } from "../services/DocService";
import { Banner } from "./Banner";
import { PackageVersionContext } from "./PackageVersionContext"
import { PackageVersion } from "../model/PackageVersion";


export interface DocumentationPageProps {
  docService: DocService,
  packageVersion: PackageVersion,
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
    this.props.docService.fetch(this.props.packageVersion).then(response => {
      this.setState(() => ({
        readme: response.readme,
        docs: response.docs
      }))
    })
  }

  render = () => (
    <PackageVersionContext.Provider value={this.props.packageVersion}>
      <div>
        <Banner />
        <div id="container">
          { this.renderPage() }
        </div>
      </div>
    </PackageVersionContext.Provider>
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