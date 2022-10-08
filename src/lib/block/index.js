import ScrollPage from '@/lib/block/scrollPage'
// leaf block
import Paragraph from '@/lib/block/commonMark/paragraph'
import AtxHeading from '@/lib/block/commonMark/atxHeading'
import SetextHeading from '@/lib/block/commonMark/setextHeading'
import ThematicBreak from '@/lib/block/commonMark/thematicBreak'
import CodeBlock from '@/lib/block/commonMark/codeBlock'
import Code from '@/lib/block/commonMark/codeBlock/code'
import Table from '@/lib/block/gfm/table'
import TableInner from '@/lib/block/gfm/table/table'
import TableRow from '@/lib/block/gfm/table/row'
import Cell from '@/lib/block/gfm/table/cell'
import HTMLBlock from '@/lib/block/commonMark/html'
import HTMLContainer from '@/lib/block/commonMark/html/htmlContainer'
import MathBlock from '@/lib/block/extra/math'
import MathContainer from '@/lib/block/extra/math/mathContainer'
import Frontmatter from '@/lib/block//extra/frontmatter'
import DiagramBlock from '@/lib/block/extra/diagram'
import DiagramContainer from '@/lib/block/extra/diagram/diagramContainer'
// container block
import BlockQuote from '@/lib/block/commonMark/blockQuote'
import OrderList from '@/lib/block/commonMark/orderList'
import ListItem from '@/lib/block/commonMark/listItem'
import BulletList from '@/lib/block/commonMark/bulletList'
import TaskList from '@/lib/block/gfm/taskList'
import TaskListItem from '@/lib/block/gfm/taskListItem'
// content
import ParagraphContent from '@/lib/block/content/paragraphContent'
import AtxHeadingContent from '@/lib/block/content/atxHeadingContent'
import SetextHeadingContent from '@/lib/block/content/setextHeadingContent'
import ThematicBreakContent from '@/lib/block/content/thematicBreakContent'
import LangInputContent from '@/lib/block/content/langInputContent'
import CodeBlockContent from '@/lib/block/content/codeBlockContent'
import TableCellContent from '@/lib/block/content/tableCell'
// Attachment Block
import TaskListCheckbox from '@/lib/block/gfm/taskListCheckbox'
import HTMLPreview from '@/lib/block/commonMark/html/htmlPreview'
import MathPreview from '@/lib/block/extra/math/mathPreview'
import DiagramPreview from '@/lib/block/extra/diagram/diagramPreview'

// Register itself
ScrollPage.register(ScrollPage)
ScrollPage.register(Paragraph)
ScrollPage.register(ParagraphContent)
ScrollPage.register(AtxHeading)
ScrollPage.register(AtxHeadingContent)
ScrollPage.register(SetextHeading)
ScrollPage.register(SetextHeadingContent)
ScrollPage.register(BlockQuote)
ScrollPage.register(ThematicBreak)
ScrollPage.register(ThematicBreakContent)
ScrollPage.register(CodeBlock)
ScrollPage.register(Code)
ScrollPage.register(LangInputContent)
ScrollPage.register(CodeBlockContent)
ScrollPage.register(OrderList)
ScrollPage.register(ListItem)
ScrollPage.register(BulletList)
ScrollPage.register(TaskList)
ScrollPage.register(TaskListItem)
ScrollPage.register(TaskListCheckbox)
// Table
ScrollPage.register(Table)
ScrollPage.register(TableInner)
ScrollPage.register(TableRow)
ScrollPage.register(Cell)
ScrollPage.register(TableCellContent)
// HTML
ScrollPage.register(HTMLBlock)
ScrollPage.register(HTMLPreview)
ScrollPage.register(HTMLContainer)
// Math
ScrollPage.register(MathBlock)
ScrollPage.register(MathPreview)
ScrollPage.register(MathContainer)
// FrontMatter
ScrollPage.register(Frontmatter)
// Diagram
ScrollPage.register(DiagramBlock)
ScrollPage.register(DiagramContainer)
ScrollPage.register(DiagramPreview)

export default ScrollPage
