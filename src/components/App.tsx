import * as React from "react"

export interface ModuleDocumentation {
  name: string
}

export interface AppProps { moduleDocs : Array<ModuleDocumentation> }

export const App = (props: AppProps) => 
  <div id="modules">
    <ul>
      { props.moduleDocs.map(moduleItem) }
    </ul>
  </div>

var moduleItem = (moduleDoc: ModuleDocumentation) => {
  return <li key={moduleDoc.name}>{moduleDoc.name}</li>
}