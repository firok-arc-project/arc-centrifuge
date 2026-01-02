# Centrifuge

用于识别和处理指定目录内的博客文档文件.

设计初衷是制作一个脱离特定客户端环境且 markdown-first 的博文处理工具.

## 文档配置

此工具会递归加载指定目录树内所有文件, 按照不同格式将对其进行不同处理.

### `.md` 文件

每个 `.md` 文件对应一篇可渲染的博文.

我们使用 `gray-matter` 读取和处理其中的 front-matter,
将所有的数据整理成若干个 JSON 数据文件输出到指定目录.

要正常处理一个文档文件, 它的 front-matter 中需要包含下述字段:

* `id: string` 文档唯一 ID. 这会用于生成唯一 URL
* `title: string` 文档标题
* `subtitle: string` 文档副标题
* `createTimestamp: string` 文档创建时间
* `updateTimestamp: string` 文档更新时间
* `tags: string[]` 文档标签. 值需要是正确配置了的标签 ID 列表

### `.tag.json` 和 `.tag.json5` 文件

用于配置标签的 JSON 数据文件.

包含如下字段:

* `id: string` 标签唯一 ID
* `name: string` 标签名称
* `desc: string` 标签描述
* `hidden: boolean` 是否是隐藏标签
* `indexing: boolean` 是否为包含此标签的博文创建索引列表
* `indexingPagination: boolean` 为此标签创建索引列表时是否需要分页
* `indexingPaginationSize: int` 为此标签创建索引列表时每页的博文数量
* `indexingPaginationMethod: string` 为此标签创建索引列表的方式
  * `"createTimestamp"` (默认方式) 基于创建时间索引
  * `"updateTimestamp"` 基于更新时间索引

