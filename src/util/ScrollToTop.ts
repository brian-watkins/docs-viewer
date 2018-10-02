import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router";

class ScrollToRoute extends React.Component<RouteComponentProps<{}>> {
  componentDidUpdate(prevProps: RouteComponentProps<{}>) {
    if (this.props.location !== prevProps.location) {
      if (this.props.location.hash) {
        document.querySelector(this.props.location.hash).scrollIntoView()
      } else {
        const module = document.querySelector("#module");
        if (module && window.scrollY > module.getBoundingClientRect().top) {
          document.querySelector("#module-list").scrollIntoView()
          window.scrollBy({ left: 0, top: 0 })
        }
      }
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToRoute)