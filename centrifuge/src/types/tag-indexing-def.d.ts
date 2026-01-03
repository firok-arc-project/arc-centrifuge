import {DocMeta} from './doc-meta-def'

export declare interface TagIndexingPage
{
  pageIndex: number
  listDocMeta: DocMeta[]
}

export declare interface TagIndexingData
{
  tagId: string
  pageSize: number
  pageCount: number
  listPage: TagIndexingPage[]
}

