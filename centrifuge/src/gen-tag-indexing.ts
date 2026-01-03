import {TagData, TagMap} from './types/tag-data-def'
import {DocMeta, DocMetaMap} from './types/doc-meta-def'
import {resolve, write} from './gen.js'

/**
 * 为某个标签生成索引内容
 * */
async function genTagIndexingSingle(
  tag: TagData,
  listSortedDocMeta: DocMeta[],
  pathFolderTarget: string,
)
{
  if(!tag.indexing)
    return

  const tagId = tag.id

  const listDocMeta =
    listSortedDocMeta.filter(docMeta => docMeta.tags.includes(tagId))

  const pathFileIndexingAll = resolve(pathFolderTarget, `tag-indexing-${tagId}-all.json`)
  await write(pathFileIndexingAll, listDocMeta)

  if(!tag.indexingPagination)
    return

  const pageSize = tag.indexingPaginationSize
  const pageCount = Math.ceil(listDocMeta.length / pageSize)
  for(let pageIndex = 0; pageIndex < pageCount; pageIndex++)
  {
    const start = pageIndex * pageSize
    const end = Math.min(start + pageSize, listDocMeta.length)
    const listDocMetaPage = listDocMeta.slice(start, end)
    const pathFileIndexingPage = resolve(pathFolderTarget, `tag-indexing-${tagId}-${pageIndex}.json`)
    await write(pathFileIndexingPage, listDocMetaPage)
  }
}

export async function genTagIndexing(
  mapTag: TagMap,
  listSortedDocMeta: DocMeta[],
  pathFolderTarget: string
): Promise<void>
{
  for(const tag of Object.values(mapTag))
  {
    await genTagIndexingSingle(tag, listSortedDocMeta, pathFolderTarget)
  }
}
