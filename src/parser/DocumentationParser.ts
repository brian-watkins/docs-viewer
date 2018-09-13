import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { DocumentationBlock, AliasBlock, ValueBlock } from "../model/DocumentationBlock";

export const parse = (doc: ModuleDocumentation): Array<DocumentationBlock> => {
  let blocks:Array<DocumentationBlock> = []
  const lines = doc.comment.split("\n")

  let currentComment = ""
  for (let line of lines) {
    if (line.startsWith("@docs")) {
      blocks.push({ kind: "comment", value: currentComment })
      currentComment = ""

      line.substring(5).trim().split(",")
        .map((name) => name.trim())
        .map((name) => findBlock(doc, name))
        .forEach((block) => blocks.push(block))
    } else {
      currentComment += line + "\n"
    }
  }

  return blocks
}

const findBlock = (doc: ModuleDocumentation, name: string): DocumentationBlock => {
  return findValueBlock(doc, name) || findAliasBlock(doc, name)
}

const findAliasBlock = (doc: ModuleDocumentation, name: string): AliasBlock => {
  let alias = doc.aliases.find((a) => a.name === name)

  if (!alias) return null

  return {
    kind: "alias",
    ...alias
  }
}

const findValueBlock = (doc: ModuleDocumentation, name: string): ValueBlock => {
  let value = doc.values.find((value) => value.name == name)
  
  if (!value) return null
   
  return { 
    kind: "value",
    ...value
  } as ValueBlock
}
