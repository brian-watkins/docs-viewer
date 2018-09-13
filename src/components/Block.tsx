import * as React from "react"
import * as ReactMarkdown from 'react-markdown'

export interface BlockProps { 
  title: string,
  comment: string,
  className: string
}

export const Block = (props: BlockProps) => (
  <div className={props.className}>
    <div className="title">{props.title}</div>
    <ReactMarkdown className="comment" source={props.comment} />
  </div>
)