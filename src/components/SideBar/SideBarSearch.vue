<template>
  <div>
    <el-input
      v-model="inputValue"
      class="w-50 m-2"
      placeholder="搜索"
      @input="handleInput"
    >
      <template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
    </el-input>
    <el-button @click="clickToPrevious">{{ '<' }}</el-button>
    <el-button @click="clickToNext">{{ '>' }}</el-button>
    <el-input
      v-model="replaceValue"
      class="w-50 m-2"
      placeholder="输入替换"
      @input="handleInput"
    >
      <template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
    </el-input>
    <el-button @click="replaceOne">{{ 'a' }}</el-button>
    <el-button @click="replaceAll">{{ 'A' }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { useMuya } from '@/utils/useMarkCore'
import { ref } from 'vue'

const muya = useMuya() as any
const inputValue = ref<string>('')
const handleInput = () => {
  muya.search(inputValue.value, { isRegexp: true })
}
const clickToPrevious = () => {
  muya.find('previous')
}
const clickToNext = () => {
  muya.find('next')
  const res = muya.editor.jsonState.getMarkdown()
  console.log(res)
}

const replaceValue = ref<string>('')
const replaceOne = () => {
  muya.replace(replaceValue.value, { isSingle: true, isRegexp: true })
}
const replaceAll = () => {
  muya.replace(replaceValue.value, { isSingle: false })
}
</script>

<style scoped></style>
