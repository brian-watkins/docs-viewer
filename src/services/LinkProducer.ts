import * as VersionHelper from "../parser/VersionParser"
import { PackageVersion } from "../model/PackageVersion";

export const linkFor = (packageVersion: PackageVersion, module?: string, value?: string) => {
  let link = `/${packageVersion.name}/versions/${VersionHelper.toString(packageVersion.version)}`

  if (module) {
    link += `/module/${module}`
  }

  if (value) {
    link += `#${value}`
  }

  return link
}