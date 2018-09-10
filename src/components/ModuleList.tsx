import * as React from "react"
import { Link } from "react-router-dom"
import { ModuleDocumentation } from "../model/ModuleDocumentation"

export interface ModuleListProps { docs : Array<ModuleDocumentation> }

export const ModuleList = (props: ModuleListProps) => (
  <div id="modules">
    <ul>
      { props.docs.map(moduleItem) }
    </ul>
  </div>
)

const moduleItem = (moduleDoc: ModuleDocumentation) => (
  <li key={moduleDoc.name}>
    <Link to={`/module/${moduleDoc.name}`}>{moduleDoc.name}</Link>
  </li>
)