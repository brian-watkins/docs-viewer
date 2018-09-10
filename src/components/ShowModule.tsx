import * as React from "react"
import { ModuleDocumentation, moduleComment } from "../model/ModuleDocumentation";
import { ValueDocumentation } from "../model/ValueDocumentation";

interface ModuleRouteParams { moduleName : string }

interface ShowModuleProps { 
  docs: ModuleDocumentation
}

export const ShowModule = (props: ShowModuleProps) => 
  <div>
    <div id="title">
      { props.docs.name }
    </div>
    <div id="values">
      <ul>
        { props.docs.values.map(showFunction) }
        { props.docs.aliases.map(showTypeAlias) }
      </ul>
    </div>
    <div id="documentation">
      <div>{ moduleComment(props.docs) }</div>
    </div>
  </div>

const showFunction = (value: ValueDocumentation) => (
  <li key={value.name} className="function">{value.name}</li>
)

const showTypeAlias = (value: ValueDocumentation) => (
  <li key={value.name} className="type-alias">{value.name}</li>
)