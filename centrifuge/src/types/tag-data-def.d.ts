import {IdEntity, IdMap} from './id-entity-def'

/**
 * 标签数据
 * */
export declare interface TagData extends IdEntity
{
  /**
   * 标签名称
   * */
  name?: string

  /**
   * 标签图标
   * */
  icon?: string

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
}

export declare type TagMap = IdMap<TagData>
