import * as React from "react"

export interface ShowProps {
  if: boolean,
  children: Array<JSX.Element>
}

export class Show extends React.Component<ShowProps> {
  render() {
    if (this.props.if) {
      return this.props.children
    } else {
      return null
    }
  }
}
