import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AboutComponent } from './about/about.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { ArticleComponent } from './article/article.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddArticleComponent } from './about/add-article/add-article.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { articlesReducer } from './about/store/articles.reducer';
import { ArticlesEffects } from './about/store/articles.effects';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { appReducer } from './shared/store/app.reducer';
import { EditComponent } from './about/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuards } from './auth.guard';
import { UserGuard, userGuard } from './user.guard';
import { AdminGuard } from './admin.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ArticleListComponent,
    AboutComponent,
    ArticleComponent,
    PageNotFoundComponent,
    AddArticleComponent,
    EditComponent,
    LoginComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([ArticlesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forRoot({articles:articlesReducer,appstate:appReducer}),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      multi: true,
      useClass:ErrorHandlerInterceptor
    },
    AuthService,
    AuthGuards,
    UserGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
