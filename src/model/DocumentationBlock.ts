import { ValueDocumentation } from "./ValueDocumentation";
import { AliasDocumentation } from "./AliasDocumentation";

export interface CommentBlock {
  kind: "comment",
  value: string
}

export interface ValueBlock extends ValueDocumentation {
  kind: "value"
}

export interface AliasBlock extends AliasDocumentation {
  kind: "alias"
}

export type DocumentationBlock = CommentBlock | ValueBlock | AliasBlock
