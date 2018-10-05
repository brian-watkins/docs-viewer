import { Version } from "../model/Version";
import * as VersionHelper from "../parser/VersionParser"

export const linkFor = (version: Version, module?: string, value?: string) => {
  let link = `/versions/${VersionHelper.toString(version)}`

  if (module) {
    link += `/module/${module}`
  }

  if (value) {
    link += `#${value}`
  }

  return link
}