import { Version } from "../model/Version";

export const linkFor = (version: Version, module?: string, value?: string) => {
  let link = `/versions/${printVersion(version)}`

  if (module) {
    link += `/module/${module}`
  }

  if (value) {
    link += `#${value}`
  }

  return link
}

const printVersion = (version: Version) => (
  `${version.major}.${version.minor}.${version.patch}`
)
