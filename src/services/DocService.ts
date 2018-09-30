import { ModuleDocumentation } from "../model/ModuleDocumentation";
import Axios from 'axios'

export interface DocService {
  fetch(): Promise<{ docs: Array<ModuleDocumentation>, readme: string }>
}

export class HttpDocService implements DocService {
  fetch = () => {
    return Promise.all([
      Axios.get("/docs/4.0.0/docs.json"),
      Axios.get("/docs/4.0.0/README.md")
    ]).then(results => {
      return {
        docs: results[0].data,
        readme: results[1].data
      }
    })
  }
}