import * as React from "react"
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { DocumentationBlock, ValueBlock, AliasBlock, UnionBlock } from "../model/DocumentationBlock"
import * as DocumentationParser from "../parser/DocumentationParser"
import { TypeDefinition } from "./TypeDefinition"
import { TypeReference } from "./TypeReference";
import { TypeArgs } from "./TypeArgs";
import { TypeVariable } from "../parser/TypeDefinitionParser";
import { assertNever } from "../util/Never";
import { Comment } from "./Comment";


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
        return <Comment className="overview-block" source={block.value} key={index} />
      case "value": 
        return this.showValue(block)
      case "alias":
        return this.showTypeAlias(block)
      case "union":
        return this.showUnionType(block)
      default:
        return assertNever(block)
    }
  }
  
  showValue = (block: ValueBlock) => (
    <div key={block.name} id={block.name} className="value-block">
      <div className="title">
        <TypeReference module={this.props.docs.name} name={block.name} data-type-name />
        <span className="separator">:</span>
        <TypeDefinition docs={this.props.allDocs} definition={block.type} />
      </div>
      <Comment className="comment" source={block.comment} />
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
      <Comment className="comment" source={block.comment} />
    </div>
  )

  showUnionType = (block: UnionBlock) => (
    <div key={block.name} id={block.name} className="union-type-block">
      <div className="title">
        <span className="type-qualifier">type</span>
        <TypeReference module={this.props.docs.name} name={block.name} data-type-name />
        <TypeArgs args={ block.args.map((a) => ({ kind: "variable", name: a } as TypeVariable)) } />
      </div>
      <Comment className="comment" source={block.comment} />
    </div>
  )
}



