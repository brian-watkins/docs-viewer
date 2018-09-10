import * as React from "react"
import {
  match,
} from 'react-router-dom'
import { ModuleDocumentation } from "../model/ModuleDocumentation";

interface ModuleRouteParams { moduleName : string }

interface ShowModuleProps { 
  match: match<ModuleRouteParams>,
  docs: ModuleDocumentation
}

export const ShowModule = (props: ShowModuleProps) => 
  <div>
    <div id="title">
      { props.match.params.moduleName }
    </div>
    <div id="values">
      <ul>
        { props.docs.values.map((value) => <li key={value.name}>{value.name}</li>) }
      </ul>
    </div>
  </div>
