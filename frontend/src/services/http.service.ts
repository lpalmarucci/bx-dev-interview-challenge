export class HttpService {
  readonly httpClient;

  constructor() {
    this.httpClient = (input: string | URL | globalThis.Request,
                       init?: RequestInit) => fetch(input, init)
  }
}
