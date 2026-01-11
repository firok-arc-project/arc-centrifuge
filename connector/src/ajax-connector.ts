
import axios, {type AxiosInstance} from 'axios'
import {BaseConnector} from './base-connector'
import {TagMap} from '@firok-arc-project/arc-centrifuge/src/types/tag-data-def'
import {DocMeta} from '@firok-arc-project/arc-centrifuge/src/types/doc-meta-def'
import {IndexingPage} from '@firok-arc-project/arc-centrifuge/src/types/indexing-data-def'
import {FetchedDocMeta, FetchedIndexingPage} from './connector-def'

export class AjaxConnector extends BaseConnector
{
  private readonly axiosMeta: AxiosInstance
  private readonly axiosDoc: AxiosInstance
  constructor(
    private readonly baseUrlMeta: string,
    private readonly baseUrlDoc: string,
  ) {
    super()
    this.axiosMeta = axios.create({
      baseURL: baseUrlMeta,
    })
    this.axiosDoc = axios.create({
      baseURL: baseUrlDoc,
    })
  }

  private async ajaxGet<TypeEntity>(url: string): Promise<TypeEntity>
  {
    const result = await this.axiosMeta({
      url,
      method: 'get',
    })
    return result.data as TypeEntity
  }

  async getAllTag(): Promise<TagMap> {
    return this.ajaxGet('/all-tag.json')
  }

  private handleDate(timestamp: number): string {
    const date = new Date(timestamp)
    // 把日期转换成 YYYY-MM-DD 格式
    return date.toISOString().slice(0, 10)
  }

  private handleDocMeta(listDocMeta: DocMeta[]): FetchedDocMeta[] {
    return listDocMeta.map(docMeta => {
      return {
        ...docMeta,
        textCreateTimestamp: this.handleDate(docMeta.createTimestamp),
        textUpdateTimestamp: this.handleDate(docMeta.updateTimestamp),
        textSortTimestamp: this.handleDate(docMeta.sortTimestamp),
      }
    })
  }

  private handleIndexingPage(page: IndexingPage): FetchedIndexingPage {
    return {
      ...page,
      listDocMeta: this.handleDocMeta(page.listDocMeta),
    }
  }

  async getTagIndexingAllData(tagId: string): Promise<FetchedDocMeta[]> {
    const list: DocMeta[] = await this.ajaxGet(`/tag-indexing-${tagId}-all.json`)
    return this.handleDocMeta(list)
  }

  async getTagIndexingPage(tagId: string, pageIndex: number): Promise<FetchedIndexingPage> {
    const page: IndexingPage = await this.ajaxGet(`/tag-indexing-${tagId}-${pageIndex}.json`)
    return this.handleIndexingPage(page)
  }

  async getTimelineIndexingAllData(): Promise<FetchedDocMeta[]> {
    const list: DocMeta[] = await this.ajaxGet(`/timeline-indexing-all.json`)
    return this.handleDocMeta(list)
  }

  async getTimelineIndexingPage(pageIndex: number): Promise<FetchedIndexingPage> {
    const page: IndexingPage = await this.ajaxGet(`/timeline-indexing-${pageIndex}.json`)
    return this.handleIndexingPage(page)
  }

  async getDocIndexing(docId: string): Promise<FetchedDocMeta> {
    const docMeta: DocMeta = await this.ajaxGet(`/doc-indexing-${docId}.json`)
    return this.handleDocMeta([docMeta])[0]
  }

  async getDocContent(docMeta: DocMeta): Promise<string> {
    const path = docMeta.pathRelative
    return await this.axiosDoc.get(path) as string
  }
}
