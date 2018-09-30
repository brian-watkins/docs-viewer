import * as React from "react"
import * as ReactMarkdown from "react-markdown"
import { CodeBlock } from "./CodeBlock";

export interface ReadmeProps {
  content: string
}

export const ReadMe = (props: ReadmeProps) => (
  <div id="readme">
    <ReactMarkdown source={props.content} renderers={{code: CodeBlock}} />
  </div>
)