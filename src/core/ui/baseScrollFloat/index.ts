import BaseFloat from '../baseFloat'
import { EVENT_KEYS } from '../../config'

class BaseScrollFloat extends BaseFloat {
  scrollElement: any
  reference: any
  activeItem: any
  renderArray: any
  constructor(muya: any, name: any, options = {}) {
    super(muya, name, options)
    this.scrollElement = null
    this.reference = null
    this.activeItem = null
    this.createScrollElement()
  }

  createScrollElement() {
    const { container } = this
    const scrollElement = document.createElement('div')
    container.appendChild(scrollElement)
    this.scrollElement = scrollElement
  }

  activeEleScrollIntoView(ele: any) {
    if (ele) {
      ele.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'start'
      })
    }
  }

  listen() {
    super.listen()
    const { eventCenter, container } = this.muya
    const handler = (event: any) => {
      if (!this.status) return
      switch (event.key) {
        case EVENT_KEYS.ArrowUp:
          this.step('previous')
          break
        case EVENT_KEYS.ArrowDown:
        case EVENT_KEYS.Tab:
          this.step('next')
          break
        case EVENT_KEYS.Enter:
          this.selectItem(this.activeItem)
          break
        default:
          break
      }
    }

    eventCenter.attachDOMEvent(container, 'keydown', handler)
  }

  hide() {
    super.hide()
    this.reference = null
  }

  show(reference?: any, cb?: any) {
    this.cb = cb
    if (reference instanceof HTMLElement) {
      if (this.reference && this.reference === reference && this.status) return
    } else {
      if (this.reference && this.reference.id === reference.id && this.status)
        return
    }

    this.reference = reference
    super.show(reference, cb)
  }

  step(direction: any) {
    let index = this.renderArray.findIndex((item: any) => {
      return item === this.activeItem
    })
    index = direction === 'next' ? index + 1 : index - 1
    if (index < 0 || index >= this.renderArray.length) {
      return
    }
    this.activeItem = this.renderArray[index]
    this.render()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const activeEle = this.getItemElement(this.activeItem)
    this.activeEleScrollIntoView(activeEle)
  }
  render() {
    throw new Error('Method not implemented.')
  }

  selectItem(item: any) {
    const { cb } = this
    cb(item)
    // delay hide to avoid dispatch enter hander
    setTimeout(this.hide.bind(this))
  }

  getItemElement() {}
}

export default BaseScrollFloat
