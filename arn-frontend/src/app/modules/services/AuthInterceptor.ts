import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercept method called');
    const token = this.tokenService.getToken();
    console.log('Token: ', token);
    let clonedRequest = req;
    if (token) {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return of(error);
        }
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      switchMap((newToken: string) => {
        this.tokenService.storeToken(newToken);
        const clonedRequest = req.clone({
          headers: new HttpHeaders({
            ...req.headers,
            'Authorization': `Bearer ${newToken}`
          })
        });
        return next.handle(clonedRequest);
      }),
      catchError((err) => {
        this.authService.logout();
        return of(err);
      })
    );
  }
}
