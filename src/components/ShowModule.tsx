import * as React from "react"
import { ModuleDocumentation, DocumentationBlock, documentationBlocks, ValueBlock } from "../model/ModuleDocumentation";
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
      { documentationBlocks(props.docs).map(printBlock) }
    </div>
  </div>

const printBlock = (block: DocumentationBlock, index: number) => {
  switch (block.kind) {
    case "comment": return <div key={index}>{ block.value }</div>
    case "value": return printValue(block)
  }
}

const printValue = (block: ValueBlock) =>
  <div className="value-block" key={block.name}>
    <div className="title">{ `${block.name} : ${block.type}` }</div>
    <div className="comment">{ block.comment }</div>
  </div>

const showFunction = (value: ValueDocumentation) => (
  <li key={value.name} className="function">{value.name}</li>
)

const showTypeAlias = (value: ValueDocumentation) => (
  <li key={value.name} className="type-alias">{value.name}</li>
)