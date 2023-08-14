import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{
article : any;
key : any;
constructor(
  private route: ActivatedRoute,
  private articleService : ArticleService,
  private router : Router
  ){}

ngOnInit(): void {
  this.route.params.subscribe(params=>{
    const key = params['key'];
    this.articleService.getArticleKey(key).subscribe(
      article=>{
        console.log(article);
        if(article == null || article == undefined){
          this.router.navigate(['page-not-found']);
        }
        else{
          this.article=article;
          console.log(this.article);
        }
        
      }
    )
    
  })
}

}
