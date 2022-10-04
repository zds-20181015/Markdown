<script setup lang="ts">
import { ref } from 'vue'
import { ElTree } from 'element-plus'

interface TOCTree {
  label: string
  children?: TOCTree[]
}
const handleNodeClick = (data: TOCTree) => {
  console.log(data)
}

const defaultToc: TOCTree[] = [
  {
    label: 'Folder 1',
    children: [
      {
        label: 'File 1-1'
      },
      {
        label: 'File 1-2'
      }
    ]
  },
  {
    label: 'Folder 2',
    children: [
      {
        label: 'File 2-1'
      },
      {
        label: 'File 2-2'
      },
      {
        label: 'File 2-3'
      }
    ]
  },
  {
    label: 'Folder 3',
    children: [
      {
        label: 'File 3-1'
      },
      {
        label: 'File 3-2'
      },
      {
        label: 'File 3-3'
      },
      {
        label: 'File 3-4'
      }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}

const props = defineProps<{
  toc: TOCTree[]
}>()
</script>
<template>
  <div>
    <ElTree :data="defaultToc" :props="defaultProps" />
  </div>
</template>

<style scoped></style>
