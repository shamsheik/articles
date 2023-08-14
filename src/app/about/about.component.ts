import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Store, select } from '@ngrx/store';
import { selectArticles } from './store/articles.selector';
import { deleteArticles, invokeArticlesApi } from './store/articles.action';
import { Appstate } from '../shared/store/appstate';
import { selectAppState } from '../shared/store/app.selector';
import { setApiStatus } from '../shared/store/app.action';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{
  showDeletePopup = false;
  deleteId!: number;
  currentRole:any;
  adminAccess:boolean = false;
constructor(
  private articleService : ArticleService,
  private store : Store,
  private appStore : Store<Appstate>,
  private router : Router,
  private authService : AuthService
  ){}

  articles$ = this.store.pipe(select(selectArticles));
  ngOnInit(): void {
    this.store.dispatch(invokeArticlesApi());
    this.currentRole = this.authService.getRole()
    if(this.currentRole == 'admin'){
      this.adminAccess = true;
    }
  }
  delete(id:number){
    this.deleteId = id;
    this.showDeletePopup = true;
  }
  onDeleteClick() {
    this.store.dispatch(deleteArticles({id:this.deleteId}))
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    this.showDeletePopup = false;
  }

  onCancelClick() {
    this.showDeletePopup = false;
  }
}
