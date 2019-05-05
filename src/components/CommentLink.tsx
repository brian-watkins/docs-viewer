import * as React from 'react'

interface CommentLinkProps {
  href: string
}

export class CommentLink extends React.PureComponent<CommentLinkProps> {

  render = () => (
    <a href={this.props.href} target="_blank">{this.props.children}</a>
  )

}