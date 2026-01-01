
/**
 * 为此标签创建索引列表的方式
 * */
export declare type TagIndexingPaginationMethod =
  /**
   * (默认方式) 基于创建时间索引
   * */
  'createTimestamp' |
  /**
   * 基于更新时间索引
   * */
  'updateTimestamp'

/**
 * 标签数据
 * */
export declare interface TagData
{
  /**
   * 标签唯一 ID
   * */
  id: string

  /**
   * 标签名称
   * */
  name?: string

  /**
   * 标签描述
   * */
  desc?: string

  /**
   * 是否是隐藏标签
   * */
  hidden?: boolean

  /**
   * 是否为包含此标签的博文创建索引列表
   * */
  indexing?: boolean

  /**
   * 为此标签创建索引列表时是否需要分页
   * */
  indexingPagination?: boolean

  /**
   * 为此标签创建索引列表时每页包含多少条信息
   * */
  indexingPaginationSize?: number

  /**
   * 为此标签创建索引列表的方式
   * */
  indexingPaginationMethod?: TagIndexingPaginationMethod
}
