import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  isAuthenticated : boolean = false;
  token:any;
  adminAccess: boolean = false;
  currentRole:any;
  constructor(
    private authService : AuthService,
    private articleService : ArticleService,
    private router : Router
    ){
  }
ngOnInit(): void {
  this.token = this.authService.getToken()
    if(this.token){
      this.isAuthenticated = true;
      console.log(this.isAuthenticated);
    }
    this.currentRole = this.authService.getRole()
    if(this.currentRole == 'admin'){
      this.adminAccess = true;
    }
  }

  onLogout(){
    this.articleService.logout().subscribe(
      ()=>{
        this.authService.setToken('');
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      }
    )
  }

}
