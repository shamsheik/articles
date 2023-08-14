import { createAction, props } from "@ngrx/store";
import { Appstate } from "./appstate";


export const setApiStatus = createAction(
    '[API] status',
    props<{apiStatus:Appstate}>()
)
