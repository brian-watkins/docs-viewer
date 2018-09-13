import { ValueDocumentation } from './ValueDocumentation'
import { AliasDocumentation } from './AliasDocumentation'

export interface ModuleDocumentation {
  name: string,
  comment: string,
  values: Array<ValueDocumentation>,
  aliases: Array<AliasDocumentation>
}
