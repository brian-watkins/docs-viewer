import { ValueDocumentation } from './ValueDocumentation'

export interface ModuleDocumentation {
  name: string,
  comment: string,
  values: Array<ValueDocumentation>,
  aliases: Array<ValueDocumentation>
}

export const moduleComment = (doc: ModuleDocumentation) =>
  doc.comment.split("\n")
    .map((line) => {
      if (line.startsWith("@docs")) {
        return line.substring(5).trim().split(",")
          .map(functionCommentPrinter(doc))
          .join("\n\n")
      }
      return line
    })
    .join("\n")

const functionCommentPrinter = (doc: ModuleDocumentation) =>
  (name: string) => {
    const value = findFunction(doc, name.trim())
    return value.comment
  }

const findFunction = (doc: ModuleDocumentation, name: string): ValueDocumentation => {
  return doc.values.find((value) => value.name == name)
}
