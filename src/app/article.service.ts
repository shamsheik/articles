import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Articles } from './about/store/articles';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: any[] | undefined;

  private baseUrl = 'http://localhost:3000/articles'

  constructor(private http : HttpClient) { }

  getArticles(){
    return this.http.get<Articles[]>("http://localhost:3000/articles");
  }

  getArticleKey(key:string){
    return this.http.get<Articles>(`${this.baseUrl}?key=${key}`);
  }
  getArticleId(id:string){
    return this.http.get<Articles>(`${this.baseUrl}?id=${id}`);
  }
  addArticles(payload:Articles){
    console.log("service call started");
    return this.http.post<Articles>("http://localhost:3000/articles",payload);
  }
  updateArticles(article:Articles){
    return this.http.put<Articles>(`http://localhost:3000/articles/${article.id}`,article);
  }

  deleteArticles(id:number){
    return this.http.delete<Articles>(`http://localhost:3000/articles/${id}`);
  }
  registerUser(data:any){
    return this.http.post('http://localhost:8080/register/registerUsers',data);
  }
  loginUser(data: any) {
    const options = { withCredentials: true };
    return this.http.post('http://localhost:8080/login/loginUser', data, {
      ...options,
      observe: 'response', // Set observe to 'response'
    }).pipe(
      map((response) => {
        return response.body;
      })
    );
  }
  authenticateUser(){
    const options = {withCredentials: true}
    return this.http.get('http://localhost:8080/userlogin/user',options);
  }
  logout(){
    const options = {withCredentials: true}
    return this.http.post('http://localhost:8080/userlogout/logout',{},options);
  }
}
