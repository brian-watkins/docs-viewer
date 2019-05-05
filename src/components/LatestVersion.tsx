import * as React from "react"
import { Redirect } from "react-router";
import { linkFor } from "../services/LinkProducer";
import { Package } from "../model/Package";


export interface LatestVersionProps {
  package: Package
}

export const LatestVersion = (props: LatestVersionProps) => (
  <Redirect to={latestVersionRoute(props.package)} />
)

const latestVersionRoute = (packageInfo: Package) => (
  linkFor(packageInfo.atLatestVersion())
)
