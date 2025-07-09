export class HttpService {
  readonly httpClient;

  constructor() {
    this.httpClient = (input: string | URL | globalThis.Request,
                       init?: RequestInit) => {
      const token = localStorage.getItem("token");
      const headers = new Headers(init?.headers);
      if(token)
        headers.append('Authorization', 'Bearer ' + JSON.parse(token));
      return fetch(input, {...init, headers});
    }
  }
}
