import {DocMeta} from './doc-meta-def'

export declare interface IndexingPageMeta
{
  pageSize: number
  pageCount: number
  recordCount: number
}

export declare interface IndexingPage extends IndexingPageMeta
{
  pageIndex: number
  listDocMeta: DocMeta[]
}
