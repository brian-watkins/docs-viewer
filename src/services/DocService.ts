import { ModuleDocumentation } from "../model/ModuleDocumentation";
import Axios from 'axios'
import { Version } from "../model/Version";

export interface DocService {
  fetch(version: Version): Promise<{ docs: Array<ModuleDocumentation>, readme: string }>
}

export class HttpDocService implements DocService {
  fetch = (version: Version) => {
    const base = `/docs/${this.printVersion(version)}`

    return Promise.all([
      Axios.get(`${base}/docs.json`),
      Axios.get(`${base}/README.md`)
    ]).then(results => {
      return {
        docs: results[0].data,
        readme: results[1].data
      }
    })
  }
  
  printVersion = (version: Version) => (
    `${version.major}.${version.minor}.${version.patch}`
  )
}