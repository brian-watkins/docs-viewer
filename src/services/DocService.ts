import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { Version } from "../model/Version";


export interface DocService {
  fetch(version: Version): Promise<{ docs: Array<ModuleDocumentation>, readme: string }>
}
