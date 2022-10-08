import paragraphIcon from '@/lib/assets/icons/paragraph/2.png'
import htmlIcon from '@/lib/assets/icons/html/2.png'
import thematicBreakIcon from '@/lib/assets/icons/horizontal_line/2.png'
import frontMatterIcon from '@/lib/assets/icons/front_matter/2.png'
import header1Icon from '@/lib/assets/icons/heading_1/2.png'
import header2Icon from '@/lib/assets/icons/heading_2/2.png'
import header3Icon from '@/lib/assets/icons/heading_3/2.png'
import header4Icon from '@/lib/assets/icons/heading_4/2.png'
import header5Icon from '@/lib/assets/icons/heading_5/2.png'
import header6Icon from '@/lib/assets/icons/heading_6/2.png'
import tableIcon from '@/lib/assets/icons/new_table/2.png'
import bulletListIcon from '@/lib/assets/icons/bullet_list/2.png'
import codeIcon from '@/lib/assets/icons/code/2.png'
import quoteIcon from '@/lib/assets/icons/quote_block/2.png'
import taskListIcon from '@/lib/assets/icons/todolist/2.png'
import mathblockIcon from '@/lib/assets/icons/math/2.png'
import orderListIcon from '@/lib/assets/icons/order_list/2.png'
import flowchartIcon from '@/lib/assets/icons/flowchart/2.png'
import sequenceIcon from '@/lib/assets/icons/sequence/2.png'
import mermaidIcon from '@/lib/assets/icons/mermaid/2.png'
import plantumlIcon from '@/lib/assets/icons/plantuml/2.png'
import vegaIcon from '@/lib/assets/icons/chart/2.png'

const HEADING_ICONS = [
  header1Icon,
  header2Icon,
  header3Icon,
  header4Icon,
  header5Icon,
  header6Icon
]

const DIAGRAM_ICONS = {
  flowchart: flowchartIcon,
  sequence: sequenceIcon,
  plantuml: plantumlIcon,
  mermaid: mermaidIcon,
  'vega-lite': vegaIcon
}

export const getIcon = (block) => {
  const { blockName } = block
  switch (blockName) {
    case 'frontmatter':
      return frontMatterIcon

    case 'paragraph':
      return paragraphIcon

    case 'block-quote':
      return quoteIcon

    case 'bullet-list':
      return bulletListIcon

    case 'order-list':
      return orderListIcon

    case 'task-list':
      return taskListIcon

    case 'code-block':
      return codeIcon

    case 'atx-heading':
      return HEADING_ICONS[block.meta.level - 1]

    case 'setext-heading':
      return HEADING_ICONS[block.meta.level - 1]

    case 'thematic-break':
      return thematicBreakIcon

    case 'table':
      return tableIcon

    case 'html-block':
      return htmlIcon

    case 'math-block':
      return mathblockIcon

    case 'diagram':
      return DIAGRAM_ICONS[block.meta.type]

    default:
      return paragraphIcon
  }
}
