
import {TagMap} from '@firok-arc-project/arc-centrifuge/src/types/tag-data-def'
import {IndexingPage} from '@firok-arc-project/arc-centrifuge/src/types/indexing-data-def'
import {DocMeta} from '@firok-arc-project/arc-centrifuge/src/types/doc-meta-def'

export abstract class BaseConnector
{
  abstract getAllTag(): Promise<TagMap>

  abstract getTagIndexingPage(tagId: string, pageIndex: number): Promise<IndexingPage>

  abstract getTagIndexingAllData(tagId: string): Promise<DocMeta[]>

  abstract getTimelineIndexingPage(pageIndex: number): Promise<IndexingPage>

  abstract getTimelineIndexingAllData(): Promise<DocMeta[]>

  abstract getDocIndexing(docId: string): Promise<DocMeta>

  /**
   * 获取文章内容
   * */
  abstract getDocContent(docMeta: DocMeta): Promise<string>
}

