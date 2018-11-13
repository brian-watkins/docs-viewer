import { ValueDocumentation } from "./ValueDocumentation";
import { AliasDocumentation } from "./AliasDocumentation";
import { UnionDocumentation } from "./UnionDocumentation";

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

export interface UnionBlock extends UnionDocumentation {
  kind: "union"
}

export type DocumentationBlock = CommentBlock | ValueBlock | AliasBlock | UnionBlock
