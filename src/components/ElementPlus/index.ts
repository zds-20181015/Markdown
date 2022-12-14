export * as ElIcons from '@element-plus/icons-vue'

import * as ElementIcons from '@element-plus/icons-vue'
export type KeyOfElIcon = keyof typeof ElementIcons

import { useDark, useToggle } from '@vueuse/core'
export const isDark = useDark()
export const toggleDark = useToggle(isDark)
