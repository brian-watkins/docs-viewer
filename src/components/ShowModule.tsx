import * as React from "react"
import {
  match,
} from 'react-router-dom'

interface ModuleRouteParams { moduleName : string }

interface ShowModuleProps { match : match<ModuleRouteParams> }

export const ShowModule = (props: ShowModuleProps) => 
  <div id="title">
    { props.match.params.moduleName }
  </div>