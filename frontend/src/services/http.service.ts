export class HttpService {
  readonly httpClient;
  private readonly _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this.httpClient = (input: string | URL | globalThis.Request,
                       init?: RequestInit) => {
      const token = localStorage.getItem("token");
      const headers = new Headers(init?.headers);
      if(token)
        headers.append('Authorization', 'Bearer ' + JSON.parse(token));
      const urlWithPrefix = this._baseUrl.concat(input.toString());
      return fetch(urlWithPrefix, {...init, headers});
    }
  }
}
