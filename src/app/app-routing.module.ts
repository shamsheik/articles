import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddArticleComponent } from './about/add-article/add-article.component';
import { EditComponent } from './about/edit/edit.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {path:'about/addArticle',component:AddArticleComponent,canActivate:[authGuard,adminGuard]},
  {path:'articles',component:ArticleListComponent,canActivate:[authGuard]},
  {path:'',component:LoginComponent},
  {path:'aboutArticles',component:AboutComponent,canActivate:[authGuard]},
  {path :'articles/:key',component:ArticleComponent},
  {path :'edit/:id',component:EditComponent,canActivate:[adminGuard]},
  {path :'login',component:LoginComponent},
  {path :'error',component:UnauthorizedComponent},
  {path:'**',redirectTo:'/page-not-found'},
  {path:'page-not-found',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
