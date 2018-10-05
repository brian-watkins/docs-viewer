import { ModuleDocumentation } from "../model/ModuleDocumentation";
import Axios from 'axios'
import { Version } from "../model/Version";
import * as VersionHelper from "../parser/VersionParser"

export interface DocService {
  fetch(version: Version): Promise<{ docs: Array<ModuleDocumentation>, readme: string }>
}

export class HttpDocService implements DocService {
  fetch = (version: Version) => {
    const base = `/docs/${VersionHelper.toString(version)}`

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
}