import {DocMeta} from './types/doc-meta-def'
import {resolve, write} from './gen.js'
import { MetaConfig } from './types/meta-config-def'
import {IndexingPage} from './types/indexing-data-def'

export async function genTimelineIndexing(
  listSortedDocMeta: DocMeta[],
  pathFolderTarget: string,
  metaConfig: MetaConfig,
): Promise<void>
{
  const pathFileIndexingAll = resolve(pathFolderTarget, 'timeline-indexing-all.json')
  await write(pathFileIndexingAll, listSortedDocMeta)

  if(!metaConfig.timelinePagination)
    return

  const pageSize = metaConfig.timelinePaginationSize
  const pageCount = Math.ceil(listSortedDocMeta.length / pageSize)
  for(let pageIndex = 0; pageIndex < pageCount; pageIndex++)
  {
    const start = pageIndex * pageSize
    const end = Math.min(start + pageSize, listSortedDocMeta.length)
    const listDocMeta = listSortedDocMeta.slice(start, end)
    const pathFileIndexing = resolve(pathFolderTarget, `timeline-indexing-${pageIndex}.json`)
    const page: IndexingPage = {
      pageIndex,
      pageSize,
      pageCount,
      recordCount: listSortedDocMeta.length,
      listDocMeta,
    }
    await write(pathFileIndexing, page)
  }
}
