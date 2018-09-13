import * as React from "react"
import * as ReactMarkdown from 'react-markdown'
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { DocumentationBlock, ValueBlock, AliasBlock } from "../model/DocumentationBlock"
import * as DocumentationParser from "../parser/DocumentationParser"
import { ValueDocumentation } from "../model/ValueDocumentation";
import { Block } from "./Block";

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
      { DocumentationParser.parse(props.docs).map(printBlock) }
    </div>
  </div>

const printBlock = (block: DocumentationBlock, index: number) => {
  switch (block.kind) {
    case "comment": 
      return <ReactMarkdown source={block.value} key={index} />
    case "value": 
      return <Block className="value-block" key={block.name} title={valueTitle(block)} comment={block.comment} /> 
    case "alias":
      return <Block className="type-alias-block" key={block.name} title={typeAliasTitle(block)} comment={block.comment} />
  }
}

const valueTitle = (block: ValueBlock): string => (
  `${block.name} : ${block.type}`
)

const typeAliasTitle = (block: AliasBlock): string => (
  `type alias ${block.name} ${block.args.join(' ')} = ${block.type}`
)

const showFunction = (value: ValueDocumentation) => (
  <li key={value.name} className="function">{value.name}</li>
)

const showTypeAlias = (value: ValueDocumentation) => (
  <li key={value.name} className="type-alias">{value.name}</li>
)