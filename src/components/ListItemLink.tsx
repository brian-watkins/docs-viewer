import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router";


export interface ListItemLinkProps extends RouteComponentProps<{}>, React.HTMLProps<HTMLLIElement> {
  to: string
}

class ListItem extends React.Component<ListItemLinkProps> {
  render = () => (
    <li {...this.filteredProps()} onClick={ () => this.props.history.push(this.props.to) }>
      {this.props.children}
    </li>
  )

  filteredProps = () => {
    const { staticContext, to, location, history, ...allowedProps } = this.props
    return allowedProps
  }
}

export const ListItemLink = withRouter(ListItem)