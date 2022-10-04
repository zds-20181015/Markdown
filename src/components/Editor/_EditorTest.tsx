import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <>
        <h1>Heading 1</h1>
        <h2>Heading 1</h2>
        <h3>Heading 1</h3>
        <h4>Heading 1</h4>
        <h5>Heading 1</h5>
        <h6>Heading 1</h6>
        <h1 id="marked---markdown-parser">Marked - Markdown Parser</h1>
        <p>
          <a href="https://github.com/markedjs/marked/">Marked</a> lets you
          convert{' '}
          <a href="http://daringfireball.net/projects/markdown/">Markdown</a>{' '}
          into HTML. Markdown is a simple text format whose goal is to be very
          easy to read and write, even when not converted to HTML. This demo
          page will let you type anything you like and see how it gets
          converted. Live. No more waiting around.
        </p>
        <h2 id="how-to-use-the-demo">How To Use The Demo</h2>
        <ol>
          <li>Type in stuff on the left.</li>
          <li>See the live updates on the right.</li>
        </ol>
        <p>
          That&#39;s it. Pretty simple. There&#39;s also a drop-down option in
          the upper right to switch between various views:
        </p>
        <ul>
          <li>
            <strong>Preview:</strong> A live display of the generated HTML as it
            would render in a browser.
          </li>
          <li>
            <strong>HTML Source:</strong> The generated HTML before your browser
            makes it pretty.
          </li>
          <li>
            <strong>Lexer Data:</strong> What{' '}
            <a href="https://github.com/markedjs/marked/">marked</a> uses
            internally, in case you like gory stuff like this.
          </li>
          <li>
            <strong>Quick Reference:</strong> A brief run-down of how to format
            things using markdown.
          </li>
        </ul>
        <h2 id="why-markdown">Why Markdown?</h2>
        <p>
          It&#39;s easy. It&#39;s not overly bloated, unlike HTML. Also, as the
          creator of{' '}
          <a href="http://daringfireball.net/projects/markdown/">markdown</a>{' '}
          says,
        </p>
        <blockquote>
          <p>
            The overriding design goal for Markdown&#39;s formatting syntax is
            to make it as readable as possible. The idea is that a
            Markdown-formatted document should be publishable as-is, as plain
            text, without looking like it&#39;s been marked up with tags or
            formatting instructions.
          </p>
        </blockquote>
        <p>
          Ready to start writing? Either start changing stuff on the left or
          <a href="/demo/?text=">clear everything</a> with a simple click.
        </p>
      </>
    )
  }
})
