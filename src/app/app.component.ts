import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngularProject';
  isAuthenticated : boolean = false;
  token:any;
  constructor(
    private authService:AuthService,
    private router : Router
  ){}
  ngOnInit(): void {
    this.token= this.authService.getToken()
      if(this.token){
        this.isAuthenticated = true;
        console.log(this.isAuthenticated);
        this.router.events.subscribe(observer=>{
          if(observer instanceof NavigationEnd){
            const isLoginPage = observer.url.includes('login') || (observer.url === '/');
            this.isAuthenticated = isLoginPage ? false : true;
          }
        });
      }
  }
}
