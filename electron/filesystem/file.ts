// eletron实现文件保存
import { dialog } from 'electron'
import { writeFile } from 'fs'
import { promisify } from 'util'
import { join } from 'path'
import { app } from 'electron'

const writeFileAsync = promisify(writeFile)

export async function saveFile(content: string) {
  console.log(content)

  const { filePath } = await dialog.showSaveDialog({
    title: '保存文件',
    defaultPath: join(app.getPath('documents'), 'undefine.md'),
    buttonLabel: '保存',
    filters: [
      {
        name: 'Markdown Files',
        extensions: ['md']
      }
    ]
  })
  console.log(filePath)

  if (filePath) {
    await writeFileAsync(filePath, content)
  }
}
