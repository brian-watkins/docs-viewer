import * as React from "react"
//@ts-ignore
import * as hljs from 'highlight.js/lib/highlight';
//@ts-ignore
import * as elm from 'highlight.js/lib/languages/elm'
//@ts-ignore
import * as bash from 'highlight.js/lib/languages/bash'
//@ts-ignore
import * as json from "highlight.js/lib/languages/json"

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('elm', elm);
hljs.registerLanguage('json', json);

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
      <code ref={this.codeEl} className={ this.detectLanguage(this.props.value) }>
        {this.props.value}
      </code>
    </pre>
  )

  detectLanguage(example: string) {
    if (example.startsWith("$")) {
      return "language-bash"
    } else if (example.startsWith("\"")) {
      return "json"
    } else {
      return "language-elm"
    }
  }
}