
import * as process from 'node:process'
import * as path from 'node:path'
import {readFileSystem} from './fs/fs-meta.js'
import {collectTagData} from './tag/tag.js'
import {collectDocData, docMapToMeta} from './doc/doc.js'

// 获取命令行参数
const args: string[] = process.argv.slice(2)

if(args.length < 1)
  throw '未指定基础目录路径'

// 始终把第一个字符串当做本次识别和处理的基础目录
const pathBaseDir = path.resolve(args[0])

// 递归识别这个目录下的文件
const folderBase = readFileSystem(pathBaseDir, pathBaseDir)

// 处理 tag 数据文件
const mapTag = await collectTagData(folderBase)

// 处理 doc 数据文件
const mapDoc = await collectDocData(folderBase)

console.log('listPath', JSON.stringify(folderBase, null, 2))
console.log('listTag', JSON.stringify(mapTag, null, 2))
console.log('listDoc', JSON.stringify(mapDoc, null, 2))

const mapDocMeta = docMapToMeta(mapDoc)

// 根据 tag 配置, 生成对应的索引


