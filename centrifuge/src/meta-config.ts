import {MetaConfig} from './types/meta-config-def'
import * as fs from 'node:fs'
import * as path from 'node:path'
import JSON5 from 'json5'

export async function readMetaConfig(pathConfig: string): Promise<MetaConfig>
{
  pathConfig = path.resolve(pathConfig)  // 把 pathConfig 处理成绝对路径

  const textMetaConfig = fs.readFileSync(pathConfig, {
    encoding: 'utf8',
  })
  const jsonMetaConfig = JSON5.parse(textMetaConfig) as MetaConfig
  let {
    sourceFolder,
    targetFolder,
    tags,
  } = jsonMetaConfig

  // 把 sourceFolder 和 targetFolder 处理成绝对路径
  sourceFolder = path.resolve(path.dirname(pathConfig), sourceFolder)
  targetFolder = path.resolve(path.dirname(pathConfig), targetFolder)

  if('string' !== typeof sourceFolder)
    throw 'sourceFolder not found: ' + jsonMetaConfig
  if('string' !== typeof targetFolder)
    throw 'targetFolder not found: ' + jsonMetaConfig
  if(!Array.isArray(tags))
    tags = []

  const setTagId = new Set<string>()
  for(const tag of tags)
  {
    let {
      id,
      name,
      desc,
      icon,
      hidden,
      indexing,
      indexingPagination,
      indexingPaginationSize,
      indexingPaginationMethod,
    } = tag

    if('string' !== typeof id)
      throw 'tag id not found: ' + tag
    if(setTagId.has(id))
      throw 'tag id duplicated: ' + id
    setTagId.add(id)

    if('string' !== typeof name)
      tag.name = null
    if('string' !== typeof desc)
      tag.desc = null
    if('string' !== typeof icon)
      tag.icon = null

    tag.hidden = !!hidden
    tag.indexing = indexing ?? false
    tag.indexingPagination = indexingPagination ?? true
    tag.indexingPaginationSize = indexingPaginationSize ?? 10
    tag.indexingPaginationMethod = indexingPaginationMethod ?? 'createTimestamp'
  }

  return {
    sourceFolder,
    targetFolder,
    tags,
  } as MetaConfig
}
