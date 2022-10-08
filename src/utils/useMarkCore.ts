import Muya from '@/lib'
import EmojiPicker from '@/lib/ui/emojiPicker'
import FormatPicker from '@/lib/ui/formatPicker'
// import ImagePicker from '@/lib/ui/imagePicker'
// import ImageSelector from '@/lib/ui/imageSelector'
import ImageToolBar from '@/lib/ui/imageToolbar'
import ImageTransformer from '@/lib/ui/transformer'
import CodePicker from '@/lib/ui/codePicker'
import TableColumnTools from '@/lib/ui/tableColumnTools'
import QuickInsert from '@/lib/ui/quickInsert'
import TableDragBar from '@/lib/ui/tableDragBar'
import TableTools from '@/lib/ui/tableTools'
import PreviewTools from '@/lib/ui/previewTools'

import FrontButton from '@/lib/ui/frontButton'
import FrontMenu from '@/lib/ui/frontMenu'

import { DEFAULT_STATE } from './useMarkCoreTestData'

Muya.use(EmojiPicker)
Muya.use(FormatPicker)
// Muya.use(ImagePicker)
// Muya.use(ImageSelector, {
//   // unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
// });
Muya.use(ImageToolBar)
Muya.use(ImageTransformer)
Muya.use(CodePicker)

Muya.use(FrontButton)
Muya.use(FrontMenu)
Muya.use(TableColumnTools)
Muya.use(QuickInsert)
Muya.use(TableDragBar)
Muya.use(TableTools)
Muya.use(PreviewTools)

const container = document.querySelector('#editor') as HTMLDivElement
// const undoBtn = document.querySelector("#undo") as HTMLButtonElement;
// const redoBtn = document.querySelector("#redo") as HTMLButtonElement;
// const searchInput = document.querySelector("#search") as HTMLInputElement;
// const previousBtn = document.querySelector("#previous") as HTMLButtonElement;
// const nextBtn = document.querySelector("#next") as HTMLButtonElement;
// const replaceInput = document.querySelector("#replace") as HTMLInputElement;
// const singleBtn = document.querySelector("#single") as HTMLButtonElement;
// const allBtn = document.querySelector("#all") as HTMLButtonElement;

let muya: Muya | undefined
/**
 * 确保muya只有一个实例,输入container创建新实例，否则返回旧实例
 */
export function useMuya(container?: HTMLDivElement) {
  if (container) {
    muya = new Muya(container, {
      json: DEFAULT_STATE,
      disableHtml: true
    })
    ;(window as any).muya = muya
    muya.init()
  } else if (muya === undefined) {
    throw Error('未初始化')
  }
  return muya
}

// undoBtn.addEventListener("click", () => {
//   muya.undo();
// });

// redoBtn.addEventListener("click", () => {
//   muya.redo();
// });

// searchInput.addEventListener("input", (event: any) => {
//   const value = event.target.value;

//   muya.search(value, { isRegexp: true });
// });

// previousBtn.addEventListener("click", () => {
//   muya.find("previous");
// });

// nextBtn.addEventListener("click", () => {
//   muya.find("next");
// });

// singleBtn.addEventListener("click", () => {
//   muya.replace(replaceInput.value, { isSingle: true, isRegexp: true });
// });

// allBtn.addEventListener("click", () => {
//   muya.replace(replaceInput.value, { isSingle: false });
// });

// muya.on("json-change", (changes) => {
//   // console.log(JSON.stringify(muya.getState(), null, 2))
//   // console.log(muya.getMarkdown())
//   // console.log(JSON.stringify(changes, null, 2))
// });

// // muya.on('selection-change', changes => {
// //   const { anchor, focus, path } = changes
// //   console.log(JSON.stringify([anchor.offset, focus.offset, path]))
// // })
