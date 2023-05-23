import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AddtokenInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if(token){
      request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) =>{
        if(error.status === 401){
          this.snackBar.open("Tiempo de Sesion Expirada", '',{
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          this.router.navigate(['/inicio/login']);
        }
        return throwError(error);
      })
    );
  }
}
