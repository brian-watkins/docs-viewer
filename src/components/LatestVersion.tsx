import * as React from "react"
import { Version } from "../model/Version";
import { Redirect } from "react-router";
import { linkFor } from "../services/LinkProducer";


export interface LatestVersionProps {
  versions: Array<Version>
}

export const LatestVersion = (props: LatestVersionProps) => (
  <Redirect to={latestVersionRoute(props.versions)} />
)

const latestVersionRoute = (versions: Array<Version>) => (
  linkFor(versions[0])
)
