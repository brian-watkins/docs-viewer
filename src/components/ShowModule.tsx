import * as React from "react"
import * as ReactMarkdown from 'react-markdown'
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { DocumentationBlock, ValueBlock, AliasBlock } from "../model/DocumentationBlock"
import * as DocumentationParser from "../parser/DocumentationParser"
import { ValueDocumentation } from "../model/ValueDocumentation";
import { TypeDefinition } from "./TypeDefinition"
import { TypeReference } from "./TypeReference";

interface ShowModuleProps {
  allDocs: Array<ModuleDocumentation>,
  docs: ModuleDocumentation
}

export class ShowModule extends React.Component<ShowModuleProps> {
  render = () => (
    <div id="module">
      <h1>
        { this.props.docs.name }
      </h1>
      <div id="values">
        <ul>
          { this.props.docs.values.map(this.showFunction) }
          { this.props.docs.aliases.map(this.showTypeAliasName) }
        </ul>
      </div>
      <div id="documentation">
        { DocumentationParser.parse(this.props.docs).map(this.printBlock) }
      </div>
    </div>
  )

  printBlock = (block: DocumentationBlock, index: number) => {
    switch (block.kind) {
      case "comment": 
        return <ReactMarkdown source={block.value} key={index} />
      case "value": 
        return this.showValue(block)
      case "alias":
        return this.showTypeAlias(block)
    }
  }
  
  showValue = (block: ValueBlock) => (
    <div key={block.name} id={block.name} className="value-block">
      <div className="title">
        <TypeReference module={this.props.docs.name} name={block.name} data-type-name />
        <span className="separator">:</span>
        <TypeDefinition docs={this.props.allDocs} definition={block.type} />
      </div>
      <ReactMarkdown className="comment" source={block.comment} />
    </div>
  )
  
  showTypeAlias = (block: AliasBlock) => (
    <div key={block.name} id={block.name} className="type-alias-block">
      <div className="title">
        <span className="type-qualifier">type alias</span>
        <TypeReference module={this.props.docs.name} name={block.name} data-type-name />
        { block.args.map(this.showArg) }
        <span className="separator">=</span>
        <TypeDefinition docs={this.props.allDocs} definition={block.type} />
      </div>
      <ReactMarkdown className="comment" source={block.comment} />
    </div>
  )
  
  showArg = (arg: string, index: number) => {
    return <span key={`${arg}-${index}`} className="type-arg">{ arg }</span>
  }
  
  showFunction = (value: ValueDocumentation) => (
    <li key={value.name} className="function">{value.name}</li>
  )
  
  showTypeAliasName = (value: ValueDocumentation) => (
    <li key={value.name} className="type-alias">{value.name}</li>
  )
}



