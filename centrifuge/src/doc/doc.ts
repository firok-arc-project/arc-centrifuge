import {FolderNode} from '../fs/fs-meta-data'
import * as fs from 'node:fs'
import {DocData, DocMap, DocMeta, DocMetaMap} from './doc-data'
import matter from 'gray-matter'


function loadDocData(text: string): DocData
{
  const fileMatter = matter.read(text)
  const json = fileMatter.data
  const content = fileMatter.content

  if(json.id == null)
    throw 'doc id not found: ' + json
  if(json.title == null)
    throw 'doc title not found: ' + json

  const dateCreate = new Date(json.createTimestamp)
  const dateUpdate = new Date(json.updateTimestamp)

  return {
    id: json.id,
    title: json.title,
    subtitle: json.subtitle,
    createTimestamp: dateCreate.getTime(),
    updateTimestamp: dateUpdate.getTime(),
    tags: [],

    content,
  } as DocData
}

function findDocData(folder: FolderNode, map: DocMap): void
{
  for(const file of folder.listChildrenFile)
  {
    if(file.filename.endsWith('.md'))
    {
      const textFile = fs.readFileSync(file.pathAbsolute, {
        encoding: 'utf-8',
      })

      const dataDoc = loadDocData(textFile)

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

export async function collectDocData(folder: FolderNode): Promise<any>
{
  const ret: DocMap = {}
  findDocData(folder, ret)
  return ret
}

export function docDataToMeta(data: DocData): DocMeta
{
  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    createTimestamp: data.createTimestamp as number,
    updateTimestamp: data.updateTimestamp as number,
    tags: data.tags ?? [],
  }
}

export function docMapToMeta(map: DocMap): DocMetaMap
{
  const ret: DocMetaMap = {}
  for(const doc of Object.values(map))
  {
    ret[doc.id] = docDataToMeta(doc)
  }
  return ret
}
