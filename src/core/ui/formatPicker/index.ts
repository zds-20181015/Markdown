import BaseFloat from '../baseFloat'
import { patch, h } from '../../parser/render/snabbdom'
import icons from './config'

import './index.css'

const defaultOptions = {
  placement: 'top',
  modifiers: {
    offset: {
      offset: '0, 5'
    }
  },
  showArrow: false
}

class FormatPicker extends BaseFloat {
  static pluginName = 'formatPicker'
  oldVnode: any
  formats: any
  icons: any
  formatContainer: any

  constructor(muya: any, options = {}) {
    const name = 'ag-format-picker'
    const opts = Object.assign({}, defaultOptions, options)
    super(muya, name, opts)
    this.oldVnode = null
    this.formats = null
    this.options = opts
    this.icons = icons
    const formatContainer = (this.formatContainer =
      document.createElement('div'))
    this.container.appendChild(formatContainer)
    this.floatBox.classList.add('ag-format-picker-container')
    this.listen()
  }

  listen() {
    const { eventCenter } = this.muya
    super.listen()
    eventCenter.subscribe(
      'muya-format-picker',
      ({ reference, formats }: any) => {
        if (reference) {
          this.formats = formats
          setTimeout(() => {
            this.show(reference)
            this.render()
          }, 0)
        } else {
          this.hide()
        }
      }
    )
  }

  render() {
    const { icons, oldVnode, formatContainer, formats } = this
    const children = icons.map((i: any) => {
      let icon: any
      let iconWrapperSelector: any
      if (i.icon) {
        // SVG icon Asset
        iconWrapperSelector = 'div.icon-wrapper'
        icon = h(
          'i.icon',
          h(
            'i.icon-inner',
            {
              style: {
                background: `url(${i.icon}) no-repeat`,
                'background-size': '100%'
              }
            },
            ''
          )
        )
      }
      const iconWrapper = h(iconWrapperSelector, icon)

      let itemSelector = `li.item.${i.type}`
      if (
        formats.some(
          (f: any) =>
            f.type === i.type || (f.type === 'html_tag' && f.tag === i.type)
        )
      ) {
        itemSelector += '.active'
      }
      return h(
        itemSelector,
        {
          attrs: {
            title: `${i.tooltip} ${i.shortcut}`
          },
          on: {
            click: (event: any) => {
              this.selectItem(event, i)
            }
          }
        },
        [iconWrapper]
      )
    })

    const vnode = h('ul', children)

    if (oldVnode) {
      patch(oldVnode, vnode)
    } else {
      patch(formatContainer, vnode)
    }
    this.oldVnode = vnode
  }

  selectItem(event: any, item: any) {
    event.preventDefault()
    event.stopPropagation()
    const { contentState } = this.muya
    contentState.render()
    contentState.format(item.type)
    if (/link|image/.test(item.type)) {
      this.hide()
    } else {
      const { formats } = contentState.selectionFormats()
      this.formats = formats
      this.render()
    }
  }
}

export default FormatPicker
