import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from '../article.service';
import { Articles } from '../about/store/articles';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit{
  articles : Articles[] =[];
constructor(
  private http: HttpClient,
  private articleService : ArticleService
  ){
  
}
ngOnInit(): void {
  this.articleService.authenticateUser().subscribe({
    next: (res) => {
      console.log("user logged in");
    },
    error: (err) => {
      console.log('Authentication error:', err);
    }
});
  this.articleService.getArticles().subscribe((data)=>{
    this.articles=data;
    console.log(this.articles);
  }
  )
}
}
