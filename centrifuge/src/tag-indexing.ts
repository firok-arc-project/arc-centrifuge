
import {TagData, TagMap} from './types/tag-data-def'
import {TagIndexingData, TagIndexingPage} from './types/tag-indexing-def'
import {DocMetaMap} from './types/doc-meta-def'

export function createTagIndexing(
  tag: TagData,
  docMetaMap: DocMetaMap
): TagIndexingData
{
  const tagId = tag.id

  const listDocMeta =
    Object.values(docMetaMap)
      .filter(docMeta => docMeta.tags.includes(tagId))

  listDocMeta.sort((dm1, dm2) => {
    switch (tag.indexingPaginationMethod)
    {
      case 'createTimestamp':
        return dm2.createTimestamp - dm1.createTimestamp
      case 'updateTimestamp':
        return dm2.updateTimestamp - dm1.updateTimestamp
      default:
        throw 'unknown indexingPaginationMethod: ' + tag.indexingPaginationMethod
    }
  })

  // 根据分页容量, 创建分页列表
  const listPage: TagIndexingPage[] = []
  const pageSize = tag.indexingPaginationSize
  const pageCount = Math.ceil(listDocMeta.length / pageSize)

  for(let pageIndex = 0; pageIndex < pageCount; pageIndex++)
  {
    const start = pageIndex * pageSize
    const end = Math.min(start + pageSize, listDocMeta.length)
    listPage.push({
      pageIndex,
      listDocMeta: listDocMeta.slice(start, end),
    })
  }

  return {
    tagId,
    pageSize,
    pageCount,
    listPage,
  } as TagIndexingData
}

export function createTagIndexingMap(
  tagMap: TagMap,
  docMetaMap: DocMetaMap
): Record<string, TagIndexingData>
{
  const ret: Record<string, TagIndexingData> = {}
  for(const tag of Object.values(tagMap))
  {
    ret[tag.id] = createTagIndexing(tag, docMetaMap)
  }
  return ret
}
