import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AdminGuard{
  currentUserRole:any;
  constructor(
    private authService : AuthService,
    private router : Router
  ){}
  canActivate():boolean{
      this.currentUserRole = this.authService.getRole();
    
    if(this.currentUserRole == 'admin'){
      return true
    }
    else{
      this.router.navigate(['/error']);
      return false;
    }
  }
}
export const adminGuard: CanActivateFn = (route, state) => {
  return inject(AdminGuard).canActivate();
};
