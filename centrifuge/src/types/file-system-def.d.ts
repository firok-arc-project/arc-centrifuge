
export declare interface FileSystemNode
{
  /**
   * 完整路径
   * */
  pathAbsolute: string

  /**
   * 相对路径
   * */
  pathRelative: string
}

export declare interface FileNode extends FileSystemNode
{
  filename: string
  fileExt: string
}

export declare interface FolderNode extends FileSystemNode
{
  listChildrenFolder: FolderNode[]
  listChildrenFile: FileNode[]
}
