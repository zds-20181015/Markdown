import { defineComponent, ref, onMounted } from 'vue'
import styles from './Editor.module.scss'

import _EditorTest from './_EditorTest'

import MarkCore from '@/core'
import { ElButton } from 'element-plus'

import { useTOCStore } from '@/store'

export default defineComponent({
  setup() {
    const editor = ref<HTMLDivElement | null>(null)
    const tocStore = useTOCStore()
    onMounted(() => {
      console.log(editor.value)
      const mark = new MarkCore(editor?.value, {})
      mark.init()

      /**
       * 注册事件，当输入时响应
       */
      mark.eventCenter.subscribe('input-toc', (toc: any) => {
        tocStore.setTOC(toc)
      })
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
          <div class={styles.input} ref={editor}></div>
        </div>
      </div>
    )
  }
})
