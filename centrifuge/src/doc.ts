
import * as fs from 'node:fs'

import matter from 'gray-matter'
import {FolderNode} from './types/file-system-def'
import {DocMeta, DocMetaMap} from './types/doc-meta-def'

/**
 * 读取文档中的元数据
 * */
function loadDocMeta(
  textDoc: string,
  pathRelative: string,
): DocMeta
{
  const fileMatter = matter(textDoc)
  // console.log('matter', fileMatter)
  const json = fileMatter.data as DocMeta
  let {
    id,
    title,
    createTimestamp,
    updateTimestamp,
    sortTimestamp,
    tags,
  } = json

  if('string' !== typeof id)
    throw 'doc id not found: ' + json
  if('string' !== typeof title)
    throw 'doc title not found: ' + json

  const dateCreate = new Date(json.createTimestamp)
  const dateUpdate = new Date(json.updateTimestamp)
  const dateSort = new Date(json.sortTimestamp)
  createTimestamp = dateCreate.getTime()
  updateTimestamp = dateUpdate.getTime()
  sortTimestamp = dateSort.getTime()

  if(!Array.isArray(tags))
    tags = []

  return {
    ...json,
    id,
    title,
    createTimestamp,
    updateTimestamp,
    sortTimestamp,
    tags,
    pathRelative,
  } as DocMeta
}

function findDocData(folder: FolderNode, map: DocMetaMap): void
{
  for(const file of folder.listChildrenFile)
  {
    if(file.filename.endsWith('.md'))
    {
      const textFile = fs.readFileSync(file.pathAbsolute, {
        encoding: 'utf-8',
      })

      const dataDoc = loadDocMeta(textFile, file.pathRelative)

      if(map[dataDoc.id] != null)
        throw 'doc id duplicated: ' + dataDoc.id

      map[dataDoc.id] = dataDoc
    }
  }

  for(const childFolder of folder.listChildrenFolder)
  {
    findDocData(childFolder, map)
  }
}

export async function collectDocMeta(folder: FolderNode): Promise<DocMetaMap>
{
  const ret: DocMetaMap = {}
  findDocData(folder, ret)
  return ret
}

export function getSortedDocMeta(map: DocMetaMap): DocMeta[]
{
  return Object.values(map).sort((a, b) => {
    return a.sortTimestamp - b.sortTimestamp
  })
}
