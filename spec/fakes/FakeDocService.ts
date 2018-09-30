import { DocService } from "../../src/services/DocService";
import { ModuleDocumentation } from "../../src/model/ModuleDocumentation";

export class FakeDocService implements DocService {
  readme: string
  docs: Array<ModuleDocumentation>

  fetch = () => {
    return Promise.resolve({ readme: this.readme, docs: this.docs })
  }
}