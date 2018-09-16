import * as React from "react"
import * as ReactMarkdown from 'react-markdown'
import { Link } from "react-router-dom"
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
      <a className="name" href={`#${block.name}`}>{block.name}</a> : {withLinks(block.type)}
    </div>
    <ReactMarkdown className="comment" source={block.comment} />
  </div>
)

const withLinks = (typeString: string) => {
  const regex = /((\w+\.)+)(\w+)/g

  let match
  let start = 0
  let parts = []
  while ((match = regex.exec(typeString)) != null) {
    parts.push(<span key={start}>{typeString.substring(start, match.index)}</span>)
    parts.push(<Link key={`${start}-link`} to={`/module/${match[1].slice(0, -1)}#${match[3]}`} data-arg-link>{match[3]}</Link>)
    start = regex.lastIndex
  }
  parts.push(<span key={start}>{typeString.substring(start)}</span>)

  return parts
}

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