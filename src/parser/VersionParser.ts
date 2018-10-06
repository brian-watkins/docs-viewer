import { Version } from "../model/Version";


export const parse = (versionString: string) => {
  const digits = versionString.split(".").map(Number)
  return {
      major: digits[0],
      minor: digits[1],
      patch: digits[2]
    } 
  }

export const toString = (version: Version) => (
  `${version.major}.${version.minor}.${version.patch}`
)
