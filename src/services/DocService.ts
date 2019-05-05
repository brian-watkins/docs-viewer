import { ModuleDocumentation } from "../model/ModuleDocumentation";
import { PackageVersion } from "../model/PackageVersion";


export interface DocService {
  fetch(packageVersion: PackageVersion): Promise<{ docs: Array<ModuleDocumentation>, readme: string }>
}
