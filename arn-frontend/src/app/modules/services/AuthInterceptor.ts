import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('api/auth')) {
      return next.handle(req);
    }

    const clonedRequest = this.addAuthorizationHeader(req);
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
      switchMap(() => {
        const clonedRequest = this.addAuthorizationHeader(req);
        return next.handle(clonedRequest);
      }),
      catchError((err) => {
        this.authService.logout();
        return of(err);
      })
    );
  }

  private addAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenService.getToken();
    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return req;
  }
}
