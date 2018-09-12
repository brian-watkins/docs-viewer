import { ValueDocumentation } from './ValueDocumentation'

export interface ModuleDocumentation {
  name: string,
  comment: string,
  values: Array<ValueDocumentation>,
  aliases: Array<ValueDocumentation>
}

export interface CommentBlock {
  kind: "comment",
  value: string
}

export interface ValueBlock extends ValueDocumentation {
  kind: "value"
}

export type DocumentationBlock = CommentBlock | ValueBlock

export const documentationBlocks = (doc: ModuleDocumentation): Array<DocumentationBlock> => {
  let blocks:Array<DocumentationBlock> = []
  const lines = doc.comment.split("\n")

  let currentComment = ""
  for (let line of lines) {
    if (line.startsWith("@docs")) {
      blocks.push({ kind: "comment", value: currentComment })
      currentComment = ""

      line.substring(5).trim().split(",")
        .map((name) => name.trim())
        .map((name) => findFunction(doc, name))
        .map((value) => {
          return { 
            kind: "value",
            ...value
          } as ValueBlock
        })
        .forEach((block) => blocks.push(block))
    } else {
      currentComment += line + "\n"
    }
  }

  return blocks
}

const findFunction = (doc: ModuleDocumentation, name: string): ValueDocumentation => {
  return doc.values.find((value) => value.name == name)
}
