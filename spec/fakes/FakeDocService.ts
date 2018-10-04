import { DocService } from "../../src/services/DocService";
import { ModuleDocumentation } from "../../src/model/ModuleDocumentation";
import { Version } from "../../src/model/Version";



export class FakeDocService implements DocService {
  readme: string
  docs: Array<ModuleDocumentation>
  fetchedVersion: Version

  fetch = (version: Version) => {
    this.fetchedVersion = version
    return Promise.resolve({ readme: this.readme, docs: this.docs })
  }
}