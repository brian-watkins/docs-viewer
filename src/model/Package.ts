import { Version } from "./Version";
import { PackageVersion } from "./PackageVersion";

export class Package {
  constructor (public name: string, public versions: Array<Version>) {}

  atVersion(version: Version): PackageVersion {
    return { name: this.name, version: version }
  }

  atLatestVersion(): PackageVersion {
    return this.atVersion(this.versions[0])
  }
}