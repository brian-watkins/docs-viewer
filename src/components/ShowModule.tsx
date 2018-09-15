import * as React from "react"
import * as ReactMarkdown from 'react-markdown'
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { DocumentationBlock, ValueBlock, AliasBlock } from "../model/DocumentationBlock"
import * as DocumentationParser from "../parser/DocumentationParser"
import { ValueDocumentation } from "../model/ValueDocumentation";


interface ShowModuleProps { 
  docs: ModuleDocumentation
}

export const ShowModule = (props: ShowModuleProps) => 
  <div id="module">
    <h1>
      { props.docs.name }
    </h1>
    <div id="values">
      <ul>
        { props.docs.values.map(showFunction) }
        { props.docs.aliases.map(showTypeAliasName) }
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
      return showValue(block)
    case "alias":
      return showTypeAlias(block)
  }
}

const showValue = (block: ValueBlock) => (
  <div key={block.name} className="value-block">
    <div className="title">
      <a className="name" href={`#${block.name}`}>{block.name}</a> : {block.type}
    </div>
    <ReactMarkdown className="comment" source={block.comment} />
  </div>
)

const showTypeAlias = (block: AliasBlock) => (
  <div key={block.name} className="type-alias-block">
    <div className="title">
      type alias <a className="name" href={`#${block.name}`}>{block.name}</a> {block.args.join(' ')} = {block.type}
    </div>
    <ReactMarkdown className="comment" source={block.comment} />
  </div>
)

const showFunction = (value: ValueDocumentation) => (
  <li key={value.name} className="function">{value.name}</li>
)

const showTypeAliasName = (value: ValueDocumentation) => (
  <li key={value.name} className="type-alias">{value.name}</li>
)