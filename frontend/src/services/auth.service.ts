import {HttpService} from "./http.service.ts";
import {LoginResponse} from "../types/auth.types.ts";

export class AuthService extends HttpService {
  constructor() {
    super('/api/auth');
  }
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const res = await this.httpClient('/login', {method: 'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password})}).then((res) => res.json());
      if(res.error)
        return Promise.reject(res);
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
