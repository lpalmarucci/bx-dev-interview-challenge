import {HttpService} from "./http.service.ts";
import {LoginResponse} from "../types/auth.ts";

export class AuthService extends HttpService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      return this.httpClient('/api/auth/login', {method: 'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password})}).then((res) => res.json());
    } catch (e) {
      let errorMessage = "Error while signing in";
      if (e instanceof Error)
        errorMessage = e.message;
      throw new Error(errorMessage);
    }
  }
}
