import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { addArticles } from '../store/articles.action';
import { Articles } from '../store/articles';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { setApiStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit{
  articleForm!: FormGroup;
constructor(
  private store : Store,
  private appStore : Store<Appstate>,
  private router : Router
){}
ngOnInit(): void {
  this.articleForm = new FormGroup({
    id: new FormControl('',Validators.required),
    title: new FormControl('',Validators.required),
    key: new FormControl('',Validators.required),
    content: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    imageUrl: new FormControl('',Validators.required)
  })
}
onSubmit(){
  const articlesData:Articles = this.articleForm.value;
  this.store.dispatch(addArticles({payload:articlesData}));
  let appStatus$ = this.appStore.pipe(select(selectAppState));
   appStatus$.subscribe((data)=>{
    if(data.apiStatus === 'success'){
      this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus:''}}))
      this.router.navigate(['/aboutArticles'])
    }
   })
}
}
