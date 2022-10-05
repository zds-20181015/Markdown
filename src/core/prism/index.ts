import Prism from 'prismjs'
import { filter } from 'fuzzaldrin'
import initLoadLanguage, {
  loadedLanguages,
  transformAliasToOrigin
} from './loadLanguage'
import { languages } from 'prismjs/components.js'

const prism = Prism
window.Prism = Prism
/* eslint-disable */
// @ts-ignore
import('prismjs/plugins/keep-markup/prism-keep-markup')
/* eslint-enable */
const langs: any[] = []

// push all languages into langs and add key "name"
for (const name of Object.keys(languages)) {
  const language = languages[name]

  langs.push({
    name,
    ...language
  })

  if (language.alias) {
    if (typeof language.alias === 'string') {
      langs.push({
        name: language.alias,
        ...language
      })
    } else if (Array.isArray(language.alias)) {
      langs.push(
        ...language.alias.map((aliasName: string) => ({
          name: aliasName,
          ...language
        }))
      )
    }
  }
}

const loadLanguage = initLoadLanguage(Prism)

const search = (text: string) => {
  return filter(langs, text, { key: 'name' })
}

// pre load latex and yaml and html for `math block` \ `front matter` and `html block`
// loadLanguage("latex");
// loadLanguage("yaml");

export { search, loadLanguage, loadedLanguages, transformAliasToOrigin }

export default prism
