import { ValueDocumentation } from './ValueDocumentation'

export interface ModuleDocumentation {
  name: string,
  comment: string,
  values: Array<ValueDocumentation>,
  aliases: Array<ValueDocumentation>
}

