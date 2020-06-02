import axios, { AxiosInstance } from 'axios'


export default class Readme {
  private http: AxiosInstance

  private encodeCredentials = (token: string) => {
    return Buffer.from(
      `${token}:`
    ).toString('base64')
  }

  constructor(token: string, version: string) {
    this.http = axios.create({
      baseURL: 'https://dash.readme.io/api/v1',
      timeout: 30000,
      headers: {
        'x-readme-version': version,
        Authorization: `Basic ${this.encodeCredentials(token)}`
      }
    })
  }

  public getCategory = async (slug: string) => {
    return await this.http.get(`categories/${slug}`).then(({ data }) => data)
  }

  public updateDoc = async (slug: string, body: any) => {
    return await this.http.put(`docs/${slug}`, body).then(({ data }) => data)
  }
}
