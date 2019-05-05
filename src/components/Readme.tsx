import * as React from "react"
import { Comment } from "./Comment"

export interface ReadmeProps {
  content: string
}

export const ReadMe = (props: ReadmeProps) => (
  <div id="readme">
    <Comment source={props.content} />
  </div>
)