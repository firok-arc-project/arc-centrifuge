
export interface DocData
{
  id: string
  title: string
  subtitle?: string
  createTimestamp: string | number
  updateTimestamp: string | number
  tags: string[]

  content: string
}

export type DocMap = Record<string, DocData>

/**
 * 文档的元数据
 * */
export interface DocMeta
{
  id: string
  title: string
  subtitle?: string
  createTimestamp: number
  updateTimestamp: number
  tags: string[]
}

export type DocMetaMap = Record<string, DocMeta>
