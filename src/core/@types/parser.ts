/* eslint-disable @typescript-eslint/ban-types */
export {}

type search = (text: string) => { name: string }[]
declare type tokenizer = (
  src: string,
  {
    highlights,
    hasBeginRules,
    labels,
    options
  }?: {
    highlights?: never[] | undefined
    hasBeginRules?: boolean | undefined
    labels?: Map<any, any> | undefined
    options?: {} | undefined
  }
) => void
