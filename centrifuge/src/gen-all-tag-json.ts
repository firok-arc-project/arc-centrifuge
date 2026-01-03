import {TagMap} from './types/tag-data-def'
import {write, resolve} from './gen.js'

export async function genAllTagJson(mapTag: TagMap, pathFolderTarget: string): Promise<void>
{
  const pathFileTarget = resolve(pathFolderTarget, 'all-tag.json')

  let content: string = JSON.stringify(Object.values(mapTag))

  await write(pathFileTarget, content)
}
