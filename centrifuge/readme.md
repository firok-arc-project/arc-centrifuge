# Centrifuge

用于识别和处理指定目录内的博客文档文件.

设计初衷是制作一个脱离特定客户端环境且 markdown-first 的博文处理工具.

使用时需要指定一个 JSON5 数据文件, 这个文件包含如下字段:

```json5
{
  "source_folder": "./input", // 一个相对路径, 指定从哪里读取文档数据
  "target_folder": "./output", // 一个相对路径, 指定将各个索引数据写入到哪里
  "tags": [
    {
      // 标签数据
    },
    // ...
  ], // 标签列表
}
```

根据文档数据, 将生成如下结构:

```text
{target_folder}/
├─ all-tag.json  所有的标签数据
│
├─ tag-indexing-{tag_id}-all.json  指定标签的索引全部数据
├─ tag-indexing-{tag_id}-0.json  指定标签的索引分页数据, 第 1 页
├─ tag-indexing-{tag_id}-1.json  指定标签的索引分页数据, 第 2 页
├─ ...
│
├─ timeline-indexing-all.json  按照时间线排序的索引全部数据
├─ timeline-indexing-0.json  按照时间线排序的索引分页数据, 第 1 页
├─ timeline-indexing-1.json  按照时间线排序的索引分页数据, 第 2 页
└─ ...
```

生成的内容不会包含各个文档的原始数据.

## 文档配置

此工具会递归加载指定目录树内所有文件, 按照不同格式将对其进行不同处理.

### 文档 front-matter 数据

每个 `.md` 文件对应一篇可渲染的博文.

我们使用 `gray-matter` 读取和处理其中的 front-matter,
将所有的数据整理成若干个 JSON 数据文件输出到指定目录.

要正常处理一个文档文件, 它的 front-matter 中需要包含下述字段:

* `id: string` 文档唯一 ID. 这会用于生成唯一 URL
* `title: string` 文档标题
* `createTimestamp: string` 文档创建时间
* `updateTimestamp: string` 文档更新时间
* `sortTimestamp: string` 文档索引排序时间
* `tags: string[]` 文档标签. 值需要是正确配置了的标签 ID 列表

原始的 front-matter 数据会作为文档的简述数据输出到各个索引数据中.

### 标签数据

标签数据包含如下字段:

* `id: string` 标签唯一 ID
* `name: string` 标签名称
* `desc: string` 标签描述
* `hidden: boolean` 是否是隐藏标签
* `indexing: boolean` 是否为包含此标签的博文创建索引列表
* `indexingPagination: boolean` 为此标签创建索引列表时是否需要分页
* `indexingPaginationSize: int` 为此标签创建索引列表时每页的博文数量

