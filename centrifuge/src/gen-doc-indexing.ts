import {DocMeta} from './types/doc-meta-def'
import {resolve, write} from './gen.js'

async function genDocIndexingSingle(
  docMeta: DocMeta,
  pathFolderTarget: string,
)
{
  const docId = docMeta.id
  const pathFileIndexing = resolve(pathFolderTarget, `doc-indexing-${docId}.json`)
  await write(pathFileIndexing, docMeta)
}

export async function genDocIndexing(
  listSortedDocMeta: DocMeta[],
  pathFolderTarget: string,
)
{
  for(const docMeta of listSortedDocMeta)
  {
    await genDocIndexingSingle(docMeta, pathFolderTarget)
  }
}
