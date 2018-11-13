import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { DocumentationBlock, AliasBlock, ValueBlock } from "../model/DocumentationBlock";


export const parse = (doc: ModuleDocumentation): Array<DocumentationBlock> => {
  let grouped = groupByComments(doc.comment.split("\n"))
    .map((line) => parseLine(doc, line))

  return flatten(grouped)
}


const groupByComments = (lines: Array<string>): Array<string> => (
  lines
    .reduce((accumulator, current) => {
      if (current.startsWith("@docs")) {
        return { 
          comment: "",
          groups: accumulator.groups.concat([ accumulator.comment, current ])
        }
      } else {
        return {
          comment: accumulator.comment + "\n" + current,
          groups: accumulator.groups
        }
      }
    }, { comment: "", groups: [] })
    .groups
)


const parseLine = (doc: ModuleDocumentation, line: string): Array<DocumentationBlock> => {
  if (line.startsWith("@docs")) {
    return parseDocsLine(doc, line)
  } else {
    return [ { kind: "comment", value: line } ]
  }
}


const parseDocsLine = (doc: ModuleDocumentation, line: string): Array<DocumentationBlock> =>
  line.substring(5).trim().split(",")
    .map((name) => name.trim())
    .map((name) => findBlock(doc, name))


const findBlock = (doc: ModuleDocumentation, name: string): DocumentationBlock => 
  findDocBlock("value", doc.values, name) || 
  findDocBlock("alias", doc.aliases, name) ||
  findDocBlock("union", doc.unions, name)


const findDocBlock = (kind: string, docList: Array<{name: string}>, name: string): DocumentationBlock => {
  let value = docList.find((value) => value.name == name)
  
  if (!value) return null
   
  return { 
    kind: kind,
    ...value
  } as DocumentationBlock
}


const flatten = <T>(list:Array<Array<T>>): Array<T> => {
  return [].concat(...list)
}