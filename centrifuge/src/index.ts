
import * as process from 'node:process'
import * as path from 'node:path'
import {readFileSystem} from './file-system.js'
import {readMetaConfig} from './meta-config.js'
import {TagMap} from './types/tag-data-def'
import {toMap} from './id-entity.js'
import {DocMetaMap} from './types/doc-meta-def'
import {collectDocMeta, getSortedDocMeta} from './doc.js'
import {genAllTagJson} from './gen-all-tag-json.js'
import {genTagIndexing} from './gen-tag-indexing.js'
import {genTimelineIndexing} from './gen-timeline-indexing.js'
import {IndexingPageMeta} from './types/indexing-data-def'

export async function main()
{
  // 获取命令行参数
  const args: string[] = process.argv.slice(2)

  if(args.length < 1)
    throw '未指定配置文件路径'

  // 始终把第一个字符串当做本次识别和处理的基础目录
  const pathMetaConfig = path.resolve(args[0])
  const metaConfig = await readMetaConfig(pathMetaConfig)

  const mapTag: TagMap = toMap(metaConfig.tags) // 处理 tag 数据

  const folderSource = readFileSystem(metaConfig.sourceFolder)
  const mapDocMeta: DocMetaMap = await collectDocMeta(folderSource)
  const listSortedDocMeta = getSortedDocMeta(mapDocMeta)

  // console.log('mapTag', mapTag)
  // console.log('mapDocMeta', mapDocMeta)

  console.log(
    '读取到文章数量: ', listSortedDocMeta.length,
    '读取到标签数量: ', Object.keys(mapTag).length,
  )

  // 开始生成并写入索引数据
  const pathFolderTarget = metaConfig.targetFolder
  await genTimelineIndexing(listSortedDocMeta, pathFolderTarget, metaConfig)
  const mapTagPaginationCollection: Record<string, IndexingPageMeta> = {}
  await genTagIndexing(
    mapTag,
    listSortedDocMeta,
    pathFolderTarget,
    mapTagPaginationCollection,
  )
  await genAllTagJson(mapTag, pathFolderTarget, mapTagPaginationCollection)
}

await main()
