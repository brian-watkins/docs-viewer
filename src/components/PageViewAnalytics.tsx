import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router";
import { History, Location } from "history";
import { AnalyticsService } from "../services/AnalyticsService";

export interface PageViewProps extends RouteComponentProps<{}> {
  analyticsService: AnalyticsService
  location: Location,
  history: History
  children: Array<JSX.Element>
}

class PageView extends React.Component<PageViewProps> {
  componentWillMount() {
    this.props.history.listen(this.onLocationChange)
    this.onLocationChange(this.props.location)
  }

  render = () => (
    this.props.children
  )

  onLocationChange = (location: Location) => {
    this.props.analyticsService.sendPageView({ path: location.pathname })
  }
}

export const PageViewAnalytics = withRouter(PageView)