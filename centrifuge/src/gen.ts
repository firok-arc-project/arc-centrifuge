import fs from 'node:fs'
import path from 'node:path'

export async function write(pathFile: string, content: string | object)
{
  const pathFolderParent = path.dirname(pathFile)
  if(!fs.existsSync(pathFolderParent))
    fs.mkdirSync(pathFolderParent, { recursive: true })

  content = 'object' === typeof content ? JSON.stringify(content) : content
  fs.writeFileSync(
    pathFile,
    content,
    { encoding: 'utf8', },
  )
}

export function resolve(pathFrom: string, pathTo: string): string
{
  return path.resolve(pathFrom, pathTo)
}

export function relative(pathFrom: string, pathTo: string): string
{
  return path.relative(pathFrom, pathTo)
}
