import {HttpService} from "./http.service.ts";
import {LoginResponse} from "../types/auth.types.ts";

export class AuthService extends HttpService {
  constructor() {
    super('/api/auth');
  }
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      return this.httpClient('/login', {method: 'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password})}).then((res) => res.json());
    } catch (e) {
      let errorMessage = "Error while signing in";
      if (e instanceof Error)
        errorMessage = e.message;
      throw new Error(errorMessage);
    }
  }
}
