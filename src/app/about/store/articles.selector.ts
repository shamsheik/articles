import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Articles } from "./articles";

export const selectArticles = createFeatureSelector<Articles[]>('articles');

export const selectArticlesbyId = (id:number)=>{
    return createSelector(selectArticles,
        (articles: Articles[])=>{
            var articleById = articles.filter(article => article.id === id);
            return articleById[0];
    })
}
