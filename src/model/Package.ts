import { Version } from "./Version";
import { PackageVersion } from "./PackageVersion";

export class Package {
  constructor (public name: string, public versions: Array<Version>) {}

  static displayName(name: string): string {
    return name.split(".").map(this.capitalize).join(".")
  }

  get displayName(): string {
    return Package.displayName(this.name)
  }

  private static capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  atVersion(version: Version): PackageVersion {
    return { name: this.name, version: version }
  }

  atLatestVersion(): PackageVersion {
    return this.atVersion(this.versions[0])
  }
}