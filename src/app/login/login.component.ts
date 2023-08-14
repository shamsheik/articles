import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm !: FormGroup;
  registerForm !: FormGroup;
  userRegistered : boolean = false;
  errorMessage: string = '';
  roles :{key:string,value:string}[] = [{key:'user',value:'User'},{key:'admin',value:'Admin'}]
  constructor(
    private http : HttpClient,
    private articleService : ArticleService,
    private router : Router,
    private authService : AuthService
    ){}
ngOnInit(): void {

  this.loginForm = new FormGroup({
    email :new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',Validators.required),
    role:new FormControl('',[Validators.required])
  })
  this.registerForm = new FormGroup({
    registerUser :new FormControl('',Validators.required),
    registerPassword : new FormControl('',Validators.required),
    repeatpassword :new FormControl('',Validators.required),
    registerEmail : new FormControl('',[Validators.required,Validators.email]),
    registerRole : new FormControl('',Validators.required)
  })
  
}
onLogin(){
  console.log(this.loginForm.getRawValue());
  const data = {
    email:this.loginForm.get('email')?.value,
    password:this.loginForm.get('password')?.value,
    role:this.loginForm.get('role')?.value
  }
  this.articleService.loginUser(data).subscribe({
    next: (res: any) => {
      // Login successful, navigate to the '/articles' route
      this.router.navigate(['/articles']);
      this.authService.setToken(res.token);
      this.authService.setRole(res.role);
    },
    error: (err) => {
      // Login failed, handle the error here
      console.log('Login error:', err.error.message);
      this.errorMessage = err.error.message;
    }
  });
}
onRegister(){
console.log(this.registerForm.getRawValue());
const data = {
  name:this.registerForm.get('registerUser')?.value,
  email:this.registerForm.get('registerEmail')?.value,
  password:this.registerForm.get('registerPassword')?.value,
  role:this.registerForm.get('registerRole')?.value
}
this.articleService.registerUser(data).subscribe(res =>{
  console.log(res);
  if(res){
    this.userRegistered = true;
  }
})
}
}

