import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router";

class ScrollToRoute extends React.Component<RouteComponentProps<{}>> {
  componentDidUpdate(prevProps: RouteComponentProps<{}>) {
    if (this.props.location !== prevProps.location) {
      if (this.props.location.hash) {
        document.querySelector(this.props.location.hash).scrollIntoView()
      } else {
        window.scrollTo(0, 0)
      }
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToRoute)