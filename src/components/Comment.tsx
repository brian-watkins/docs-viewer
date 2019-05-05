import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import { CodeBlock } from './CodeBlock';
import { CommentLink } from './CommentLink';

export interface CommentProps {
  className?: string,
  source: string
}

export class Comment extends React.PureComponent<CommentProps> {

  render = () => (
    <ReactMarkdown className={this.props.className} source={this.props.source} renderers={this.renderers()} />
  )

  renderers = () => (
    { code: CodeBlock
    , link: CommentLink
    }
  )

}