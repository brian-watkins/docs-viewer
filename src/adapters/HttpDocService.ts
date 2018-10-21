import { DocService } from "../services/DocService";
import { Version } from "../model/Version";
import * as VersionHelper from "../parser/VersionParser"
import { ModuleDocumentation } from "../model/ModuleDocumentation";
import Axios from "axios"

export class HttpDocService implements DocService {
  fetch = (version: Version) => {
    const base = `/docs/${VersionHelper.toString(version)}`

    return Promise.all([
      Axios.get(`${base}/docs.json`),
      Axios.get(`${base}/README.md`)
    ]).then(results => {
      return {
        docs: sorted(results[0].data),
        readme: results[1].data
      }
    })
  }
}

const sorted = (docs: Array<ModuleDocumentation>) => {
  return docs.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
}