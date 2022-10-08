import { defineComponent, ref, onMounted } from 'vue'
import styles from './Editor.module.scss'

import _EditorTest from './_EditorTest'

import Muya from '@/lib'
import { ElButton } from 'element-plus'

import { useTOCStore } from '@/store'

import { useMuya } from '@/utils/useMarkCore'

import { block } from '@/lib/utils/marked/blockRules'
import { stateToTOCTree, toTOCTree } from '../SideBar'

export default defineComponent({
  setup() {
    const editor = ref<HTMLDivElement | undefined>(undefined)
    const tocStore = useTOCStore()
    const setToc = (muya: Muya) => {
      const state = muya.editor.jsonState.getState()
      const tocTree = stateToTOCTree(state)
      tocStore.setTOC(tocTree)
    }
    onMounted(() => {
      if (editor.value) {
        const muya = useMuya(editor.value)
        /**
         * 注册事件，当输入时响应
         */
        muya?.eventCenter.subscribe('input-toc', (toc: any) => {
          tocStore.setTOC(toc)
        })
        setToc(muya)
        muya.domNode.oninput = () => {
          setToc(muya)
        }
      }
      const edit: HTMLDivElement = document.getElementsByClassName(
        styles.editor
      )[0] as HTMLDivElement
      const basic: HTMLDivElement = document.getElementsByClassName(
        styles.input
      )[0] as HTMLDivElement
      const button: any = document.querySelectorAll('.button')

      button[0].onclick = () => {
        if (basic.style.color !== 'black') {
          basic.style.color = 'black'
          basic.style.backgroundColor = 'white'
          edit.style.backgroundColor = 'grey'
        } else {
          basic.style.color = 'white'
          basic.style.backgroundColor = 'grey'
          edit.style.backgroundColor = 'white'
        }
      }
    })

    return () => (
      <div class={styles.root}>
        <ElButton class="button">更换主题</ElButton>
        <div class={styles.editor}>
          <div
            class={styles.input}
            ref={editor}
            onInput={() => {
              console.log('this is ')
            }}
          ></div>
        </div>
      </div>
    )
  }
})
