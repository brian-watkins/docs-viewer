import * as React from "react"
import * as hljs from "highlight.js"

export interface CodeBlockProps {
  value: string
}

export class CodeBlock extends React.PureComponent<CodeBlockProps> {
  private codeEl = React.createRef<HTMLElement>()

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl.current)
  }

  render = () => (
    <pre>
      <code ref={this.codeEl} className={`language-elm`}>
        {this.props.value}
      </code>
    </pre>
  )
}