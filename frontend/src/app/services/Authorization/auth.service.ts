import { Injectable } from '@angular/core';
import { jwtDecode }from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  decodeToken(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      return decoded; 
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
}
