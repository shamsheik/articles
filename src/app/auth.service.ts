import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token:any;
  role:any;
  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setRole(role:string){
    localStorage.setItem('role',role);
  }
  getRole(){
    return localStorage.getItem('role');
  }
}
