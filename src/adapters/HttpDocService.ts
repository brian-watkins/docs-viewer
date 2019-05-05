import Axios from "axios"
import { DocService } from "../services/DocService"
import * as VersionHelper from "../parser/VersionParser"
import { ModuleDocumentation } from "../model/ModuleDocumentation"
import { PackageVersion } from "../model/PackageVersion";

export class HttpDocService implements DocService {
  fetch = (packageVersion: PackageVersion) => {
    const base = `/docs/${packageVersion.name.toLowerCase()}/${VersionHelper.toString(packageVersion.version)}`

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