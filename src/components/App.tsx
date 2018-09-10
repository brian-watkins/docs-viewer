import * as React from "react"
import {
  Route,
  Link,
  RouteComponentProps,
} from 'react-router-dom'

import { ShowModule } from "./ShowModule"
import { ModuleList } from "./ModuleList"
import { ModuleDocumentation } from "../model/ModuleDocumentation"


export interface AppProps { docs : Array<ModuleDocumentation> }

interface MatchProps { moduleName: string }

export class App extends React.Component<AppProps, {}> {
  render = () => (
    <div>
      <ModuleList docs={this.props.docs} />
      <Route path={"/module/:moduleName"} render={this.showModule} />
    </div>
  )

  showModule = (props: RouteComponentProps<MatchProps>) => (
    <ShowModule {...props} docs={ this.docsFor(props.match.params.moduleName) } />
  )

  docsFor(moduleName: string) {
    return this.props.docs.find((doc) => doc.name == moduleName)
  }
}
