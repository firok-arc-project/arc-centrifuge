
import {TagMap} from '../../centrifuge/src/types/tag-data-def'
import {IndexingPage} from '../../centrifuge/src/types/indexing-data-def'
import {DocMeta} from '../../centrifuge/src/types/doc-meta-def'

export abstract class BaseConnector
{
  abstract getAllTag(): Promise<TagMap>

  abstract getTagIndexingPage(tagId: string, pageIndex: number): Promise<IndexingPage>

  abstract getTagIndexingAllData(tagId: string): Promise<DocMeta[]>

  abstract getTimelineIndexingPage(pageIndex: number): Promise<IndexingPage>

  abstract getTimelineIndexingAllData(): Promise<DocMeta[]>
}

