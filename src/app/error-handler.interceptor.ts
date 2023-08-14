import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error.status === 404){
          console.log("Error Ocuured: Status of error 404")
        }
        if(error.status === 400){
          console.log("Bad Request: Status of error 400")
        }
        return throwError(error);
      })
    )
  }
}
