import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class UserGuard{
  currentUserRole:any;
  constructor(
    private authService : AuthService,
    private router : Router
  ){}
  canActivate():boolean{
      this.currentUserRole = this.authService.getRole();
    
    if(this.currentUserRole == 'user'){
      return true
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
export const userGuard: CanActivateFn = (route, state) => {
  return inject(UserGuard).canActivate();
};
