
import axios, {type AxiosInstance} from 'axios'
import {BaseConnector} from './base-connector'
import {TagMap} from '../../centrifuge/src/types/tag-data-def'
import {DocMeta} from '../../centrifuge/src/types/doc-meta-def'
import {IndexingPage} from '../../centrifuge/src/types/indexing-data-def'

export class AjaxConnector extends BaseConnector
{
  private readonly axios: AxiosInstance
  constructor(private readonly baseUrl: string) {
    super()
    this.axios = axios.create({
      baseURL: baseUrl,
    })
  }

  private async ajaxGet<TypeEntity>(url: string): Promise<TypeEntity>
  {
    const result = await this.axios({
      url,
      method: 'get',
    })
    return result.data as TypeEntity
  }

  async getAllTag(): Promise<TagMap> {
    return this.ajaxGet('/all-tag.json')
  }

  async getTagIndexingAllData(tagId: string): Promise<DocMeta[]> {
    return this.ajaxGet(`/tag-indexing-${tagId}-all.json`)
  }

  async getTagIndexingPage(tagId: string, pageIndex: number): Promise<IndexingPage> {
    return this.ajaxGet(`/tag-indexing-${tagId}-${pageIndex}.json`)
  }

  async getTimelineIndexingAllData(): Promise<DocMeta[]> {
    return this.ajaxGet(`/timeline-indexing-all.json`)
  }

  async getTimelineIndexingPage(pageIndex: number): Promise<IndexingPage> {
    return this.ajaxGet(`/timeline-indexing-${pageIndex}.json`)
  }

}
