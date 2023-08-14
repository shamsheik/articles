import { createAction, props } from "@ngrx/store";
import { Articles } from "./articles";

export const invokeArticlesApi = createAction(
    "[Articles] Invoke API"
)

export const fetchArticles = createAction(
    "[Articles] Fetch Articles",
    props<{allArticles: Articles[]}>()
)

export const addArticles = createAction(
    "[Articles] Add",
    props<{payload:Articles}>()
)

export const updateArticles = createAction(
    "[Articles APi] Update",
    props<{payload:Articles}>()
)

export const deleteArticles = createAction(
    "[Articles API] delete",
    props<{id:number}>()
)
