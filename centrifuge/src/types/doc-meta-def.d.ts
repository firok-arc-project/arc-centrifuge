
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
  sortTimestamp: number
  tags: string[]
  pathRelative: string
}

export type DocMetaMap = Record<string, DocMeta>
