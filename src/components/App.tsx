import * as React from "react"
import {
  Route,
  Link,
} from 'react-router-dom'

import { ShowModule } from "./ShowModule"

export interface ModuleDocumentation {
  name: string
}

export interface AppProps { moduleDocs : Array<ModuleDocumentation> }

export class App extends React.Component<AppProps, {}> {
  render = () => (
    <div>
      { this.moduleList() }
      <Route path={"/module/:moduleName"} component={ShowModule} />
    </div>
  )

  moduleList = () => (
    <div id="modules">
      <ul>
        { this.props.moduleDocs.map(this.moduleItem) }
      </ul>
    </div>
  )

  moduleItem = (moduleDoc: ModuleDocumentation) => (
    <li key={moduleDoc.name}>
      <Link to={`/module/${moduleDoc.name}`}>{moduleDoc.name}</Link>
    </li>
  )
}
