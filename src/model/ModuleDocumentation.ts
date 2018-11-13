import { ValueDocumentation } from './ValueDocumentation'
import { AliasDocumentation } from './AliasDocumentation'
import { UnionDocumentation } from './UnionDocumentation';

export interface ModuleDocumentation {
  name: string,
  comment: string,
  values: Array<ValueDocumentation>,
  aliases: Array<AliasDocumentation>,
  unions: Array<UnionDocumentation>
}
