import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ArticleService } from "src/app/article.service";
import { addArticles, fetchArticles, invokeArticlesApi , updateArticles,deleteArticles} from "./articles.action";
import { exhaustMap, map, mergeMap, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { Appstate } from "src/app/shared/store/appstate";
import { setApiStatus } from "src/app/shared/store/app.action";

@Injectable()
export class ArticlesEffects {
    constructor(
        private action$ : Actions,
        private articleService : ArticleService,
        private appStore : Store<Appstate>
        ){}

        loadArticles$ = createEffect(()=>
        this.action$.pipe(
            ofType(invokeArticlesApi),
            switchMap(()=>{
                return this.articleService.getArticles().pipe(
                    map((data)=>fetchArticles({allArticles: data}))
                )
            })
        )
        )
        addArticles$ = createEffect(()=>{
            return this.action$.pipe(
                ofType(addArticles),
                exhaustMap((action) => {
                    this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus:''}}))
                    return this.articleService.addArticles(action.payload).pipe(
                        map((data) => {
                            console.log("service data recieved");
                            this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus:'success'}}))
                            return addArticles({ payload: data })
                        }
                        )
                    );
                })
            );
        })

        updateArticles$ = createEffect(()=>{
            return this.action$.pipe(
                ofType(updateArticles),
                exhaustMap((action)=>{
                    this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus:''}}))
                    return this.articleService.updateArticles(action.payload).pipe(
                        map((data)=>{
                            console.log("update service data", data);
                            this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus:'success'}}))
                            return updateArticles({payload:data})
                        })
                    )
                })
            )
        })

        deleteArticles$ = createEffect(()=>{
            return this.action$.pipe(
                ofType(deleteArticles),
                exhaustMap((action)=>{
                    this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus:''}}));
                    return this.articleService.deleteArticles(action.id).pipe(
                        map((data)=>{
                            console.log("data deleted",data);
                            this.appStore.dispatch(setApiStatus({apiStatus:{apiStatus:'success'}}));
                            return deleteArticles({id:action.id})
                        })
                    )
                })
            )
        })
}
