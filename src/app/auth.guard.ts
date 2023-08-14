import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuards{
  isAuthenticated : boolean = false;
  loginToken:any;
  currentUserRole:any;
  constructor(
    private authService : AuthService,
    private router : Router
  ){}
  canActivate():boolean{
    this.loginToken = this.authService.getToken();
    if(this.loginToken){
      return true
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuards).canActivate();
};
