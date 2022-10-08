import Parent from '@/lib/block/base/parent'
import ScrollPage from '@/lib/block/scrollPage'
import { mixins } from '@/lib/utils'
import leafQueryBlock from '@/lib/block/mixins/leafQueryBlock'

class ThematicBreak extends Parent {
  static blockName = 'thematic-break'

  static create(muya, state) {
    const heading = new ThematicBreak(muya, state)

    heading.append(
      ScrollPage.loadBlock('thematicbreak.content').create(muya, state.text)
    )

    return heading
  }

  get path() {
    const { path: pPath } = this.parent
    const offset = this.parent.offset(this)

    return [...pPath, offset]
  }

  constructor(muya) {
    super(muya)
    this.tagName = 'p'
    this.classList = ['mu-thematic-break']
    this.createDomNode()
  }

  getState() {
    return {
      name: 'thematic-break',
      text: this.children.head.text
    }
  }
}

mixins(ThematicBreak, leafQueryBlock)

export default ThematicBreak
