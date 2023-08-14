import { createReducer , on} from "@ngrx/store";
import { Articles } from "./articles";
import { addArticles, deleteArticles, fetchArticles, updateArticles } from "./articles.action";

export const initialState : ReadonlyArray<Articles> = [];

export const articlesReducer = createReducer(
    initialState,
    on(fetchArticles,(state,{allArticles})=>{
        console.log("articles", allArticles);
        return allArticles;
    }),
    on(addArticles,(state,{payload})=>{
        let newState=[...state];
        newState.push(payload);
        return newState;
    }),
    on(updateArticles,(state,{payload})=>{
        let newState = state.filter(a => (a.id == payload.id? payload : a));
        newState.push(payload);
        return newState;
    }),
    on(deleteArticles,(state,{id})=>{
        let newState = state.filter(a => a.id !== id)
        return newState;
    })
    );


