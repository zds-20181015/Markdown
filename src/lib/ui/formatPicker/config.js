import { isOsx } from '@/lib/config'
import strongIcon from '@/lib/assets/icons/format_strong/2.png'
import emphasisIcon from '@/lib/assets/icons/format_emphasis/2.png'
import underlineIcon from '@/lib/assets/icons/format_underline/2.png'
import codeIcon from '@/lib/assets/icons/code/2.png'
import imageIcon from '@/lib/assets/icons/format_image/2.png'
import linkIcon from '@/lib/assets/icons/format_link/2.png'
import strikeIcon from '@/lib/assets/icons/format_strike/2.png'
import mathIcon from '@/lib/assets/icons/format_math/2.png'
import highlightIcon from '@/lib/assets/icons/highlight/2.png'
import clearIcon from '@/lib/assets/icons/format_clear/2.png'

const COMMAND_KEY = isOsx ? '⌘' : 'Ctrl'

const icons = [
  {
    type: 'strong',
    tooltip: 'Emphasize',
    shortcut: `${COMMAND_KEY}+B`,
    icon: strongIcon
  }, {
    type: 'em',
    tooltip: 'Italic',
    shortcut: `${COMMAND_KEY}+I`,
    icon: emphasisIcon
  }, {
    type: 'u',
    tooltip: 'Underline',
    shortcut: `${COMMAND_KEY}+U`,
    icon: underlineIcon
  }, {
    type: 'del',
    tooltip: 'Strikethrough',
    shortcut: `${COMMAND_KEY}+D`,
    icon: strikeIcon
  }, {
    type: 'mark',
    tooltip: 'Highlight',
    shortcut: `⇧+${COMMAND_KEY}+H`,
    icon: highlightIcon
  }, {
    type: 'inline_code',
    tooltip: 'Inline Code',
    shortcut: `${COMMAND_KEY}+\``,
    icon: codeIcon
  }, {
    type: 'inline_math',
    tooltip: 'Inline Math',
    shortcut: `⇧+${COMMAND_KEY}+M`,
    icon: mathIcon
  }, {
    type: 'link',
    tooltip: 'Link',
    shortcut: `${COMMAND_KEY}+L`,
    icon: linkIcon
  }, {
    type: 'image',
    tooltip: 'Image',
    shortcut: `⇧+${COMMAND_KEY}+I`,
    icon: imageIcon
  }, {
    type: 'clear',
    tooltip: 'Eliminate',
    shortcut: `⇧+${COMMAND_KEY}+R`,
    icon: clearIcon
  }
]

export default icons
