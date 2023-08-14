import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { updateArticles } from '../store/articles.action';
import { switchMap } from 'rxjs';
import { ArticleService } from 'src/app/article.service';
import { Articles } from '../store/articles';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setApiStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
  updateForm !: FormGroup;
  articleId!: any;
  articles : any;
  constructor(
    private store : Store,
    private router : Router,
    private route : ActivatedRoute,
    private articleService : ArticleService,
    private formbuilder : FormBuilder,
    private appStore : Store<Appstate>
  ){}
ngOnInit(): void {
  this.updateForm = this.formbuilder.group({
    id: [''],
    title: [''],
    key: [''],
    content: [''],
    description: [''],
    imageUrl: ['']
    })
  this.route.params.subscribe(params=>{
    const id = params['id'];
    this.articleService.getArticleId(id).subscribe(
      article=>{
        console.log(article);
        if(article == null || article == undefined){
          this.router.navigate(['page-not-found']);
        }
        else{
          this.articles=article;
          this.patchForm();
          console.log(this.articles);
        }
        
      }
    )
    
  })
}

patchForm(){
  this.updateForm.patchValue({
    id: this.articles[0].id,
    title:this.articles[0].title,
    key:this.articles[0].key,
    content:this.articles[0].content,
    description: this.articles[0].description,
    imageUrl: this.articles[0].imageUrl
  })
}
updateArticle(){
  const updatedArticle = this.updateForm.value;
  this.store.dispatch(updateArticles({payload: updatedArticle}))
  let appStatus$ = this.appStore.pipe(select(selectAppState));
   appStatus$.subscribe((data)=>{
    if(data.apiStatus === 'success'){
      this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus:''}}))
      this.router.navigate(['/aboutArticles'])
    }
   })
}

}
