import * as React from "react"
import * as ReactMarkdown from 'react-markdown'
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { DocumentationBlock, ValueBlock, AliasBlock } from "../model/DocumentationBlock"
import * as DocumentationParser from "../parser/DocumentationParser"
import { TypeDefinition } from "./TypeDefinition"
import { TypeReference } from "./TypeReference";
import { CodeBlock } from "./CodeBlock"
import { TypeArgs } from "./TypeArgs";
import { TypeVariable } from "../parser/TypeDefinitionParser";

interface DocumentationProps {
  allDocs: Array<ModuleDocumentation>,
  docs: ModuleDocumentation
}

export class Documentation extends React.Component<DocumentationProps> {
  render = () => (
    <div id="module">
      <h1>
        { this.props.docs.name }
      </h1>
      <div id="documentation">
        { DocumentationParser.parse(this.props.docs).map(this.printBlock) }
      </div>
    </div>
  )

  printBlock = (block: DocumentationBlock, index: number) => {
    switch (block.kind) {
      case "comment": 
        return <ReactMarkdown source={block.value} key={index} renderers={{code: CodeBlock}} />
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
      <ReactMarkdown className="comment" source={block.comment} renderers={{code: CodeBlock}} />
    </div>
  )
  
  showTypeAlias = (block: AliasBlock) => (
    <div key={block.name} id={block.name} className="type-alias-block">
      <div className="title">
        <span className="type-qualifier">type alias</span>
        <TypeReference module={this.props.docs.name} name={block.name} data-type-name />
        <TypeArgs args={ block.args.map((a) => ({ kind: "variable", name: a } as TypeVariable)) } />
        <span className="separator">=</span>
        <TypeDefinition docs={this.props.allDocs} definition={block.type} />
      </div>
      <ReactMarkdown className="comment" source={block.comment} renderers={{code: CodeBlock}} />
    </div>
  )  
}



