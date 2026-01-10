import {DocMeta} from '../../centrifuge/src/types/doc-meta-def'
import {IndexingPage} from '../../centrifuge/src/types/indexing-data-def'

export declare interface FetchedDocMeta extends DocMeta
{
  textCreateTimestamp: string
  textUpdateTimestamp: string
  textSortTimestamp: string
}

export declare interface FetchedIndexingPage extends IndexingPage
{
  listDocMeta: FetchedDocMeta[]
}
