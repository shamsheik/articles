import { createReducer, on } from "@ngrx/store";
import { Appstate } from "./appstate";
import { setApiStatus } from "./app.action";

export const initialState: Appstate={
    apiStatus:''
}
export const appReducer = createReducer(
    initialState,
    on(setApiStatus,(state,{apiStatus})=>{
        return apiStatus;
    })
)
