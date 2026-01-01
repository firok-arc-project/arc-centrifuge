import type {FileNode, FolderNode} from './fs-meta-data.d.ts'

import * as fs from 'node:fs'
import * as path from 'node:path'
import {Dirent} from 'node:fs'

export function readFileSystem(pathDir: string, pathBaseDir: string): FolderNode
{
  const listDirent: Dirent[] = fs.readdirSync(pathDir, {
    withFileTypes: true,
  })
  const pathAbsolute = path.resolve(pathDir)
  const pathRelative = path.relative(pathBaseDir, pathDir)

  const listFolder: FolderNode[] = []
  const listFile: FileNode[] = []

  for(const obj of listDirent)
  {
    const pathAbsolute = path.resolve(pathDir, obj.name)
    const pathRelative = path.relative(pathDir, pathAbsolute)

    if(obj.isFile())
    {
      const filename = obj.name
      const fileExt = filename.split('.').pop()
      listFile.push({
        filename,
        fileExt,
        pathAbsolute,
        pathRelative,
      } as FileNode)
    }
    else if(obj.isDirectory())
    {
      const folderNode = readFileSystem(pathAbsolute, pathBaseDir)
      listFolder.push(folderNode)
    }
  }

  return {
    listChildrenFile: listFile,
    listChildrenFolder: listFolder,
    pathAbsolute,
    pathRelative,
  } as FolderNode
}
