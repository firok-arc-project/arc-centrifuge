import type {TagData} from './tag-data.d.ts'
import {FolderNode} from '../fs/fs-meta-data'
import * as fs from 'node:fs'
import JSON5 from 'json5'
import {DocMap} from '../doc/doc-data'

function loadTagData(json: any): TagData
{
  if(json.id == null)
    throw 'tag id not found: ' + json
  return {
    id: json.id,
    name: json.name,
    desc: json.desc,
    hidden: !!json.hidden,
    indexing: !!json.indexing,
    indexingPagination: !!json.indexingPagination,
    indexingPaginationSize: json.indexingPaginationSize ?? 10,
    indexingPaginationMethod: json.indexingPaginationMethod ?? 'createTimestamp',
  } as TagData
}

export type TagMap = Record<string, TagData>

function findTagData(folder: FolderNode, map: TagMap): void
{
  for(const file of folder.listChildrenFile)
  {
    if(file.filename.endsWith('.tag.json') || file.filename.endsWith('.tag.json5'))
    {
      const textFile = fs.readFileSync(file.pathAbsolute, {
        encoding: 'utf-8',
      })
      const json = JSON5.parse(textFile)
      const tag = loadTagData(json)

      if(map[tag.id] != null)
        throw 'tag id duplicated: ' + tag.id

      map[tag.id] = tag
    }
  }

  for(const childFolder of folder.listChildrenFolder)
  {
    findTagData(childFolder, map)
  }
}

export async function collectTagData(folder: FolderNode): Promise<TagMap>
{
  const ret: TagMap = {}
  findTagData(folder, ret)
  return ret
}
