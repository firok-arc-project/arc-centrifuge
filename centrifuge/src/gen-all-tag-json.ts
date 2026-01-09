import {TagMap} from './types/tag-data-def'
import {write, resolve} from './gen.js'
import {IndexingPageMeta} from './types/indexing-data-def'

export async function genAllTagJson(
  mapTag: TagMap,
  pathFolderTarget: string,
  mapTagPaginationCollection: Record<string, IndexingPageMeta>
): Promise<void>
{
  const pathFileTarget = resolve(pathFolderTarget, 'all-tag.json')
  const listTagJson: object[] = []
  for(const tag of Object.values(mapTag))
  {
    const tagId = tag.id
    const tagPagination = mapTagPaginationCollection[tagId]

    const tagJson: object = {
      ...tag,
    }
    if(tagPagination != null)
    {
      tagJson['pageCount'] = tagPagination.pageCount
      tagJson['recordCount'] = tagPagination.recordCount
    }

    listTagJson.push(tagJson)
  }

  let content: string = JSON.stringify(listTagJson)
  await write(pathFileTarget, content)
}
