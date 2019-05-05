import * as React from "react"
import { linkFor } from "../services/LinkProducer";
import { ListItemLink } from "./ListItemLink"
import { Package } from "../model/Package";

export interface PackageListProps {
  packages: Array<Package>
}

export class PackageList extends React.Component<PackageListProps> {
  render = () => (
    <div id="packages">
      <h1>/ Packages</h1>
      <ul>
        { this.props.packages.map(this.showPackage) }
      </ul>
    </div>
  )
  
  showPackage = (packageInfo: Package) => (
    <ListItemLink key={ packageInfo.name } to={ linkFor(packageInfo.atLatestVersion()) }>
      <h1>{ packageInfo.name }</h1>
    </ListItemLink>
  )
}

