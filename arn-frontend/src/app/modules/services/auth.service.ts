import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Login} from '../components/login-panel/enitites/Login';
import {Registration} from '../components/registration-panel/entities/Registration';
import {catchError, map} from 'rxjs/operators';
import {LoginResponse} from '../objects/LoginResponse';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_API_ENDPOINT = 'api/auth';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(loginInfo: Login): Observable<any> {
    return this.http.post<LoginResponse>(`${this.USER_API_ENDPOINT}/login`, loginInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    }).pipe(
      map(response => {
        const authToken = response.headers.get('Authorization');
        const refreshToken = response.headers.get('Refresh-Token');
        if (authToken) {
          this.tokenService.storeToken(authToken);
          this.tokenService.storeRefreshToken(refreshToken);
        }
        return response.body;
      })
    );
  }

  registration(registrationInfo: Registration): Observable<any> {
    return this.http.post(`${this.USER_API_ENDPOINT}/registration`, registrationInfo, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return of(null);
    }
    return this.http.post<{ accessToken: string }>(`${this.USER_API_ENDPOINT}/refresh-token`, {refreshToken}).pipe(
      map(response => {
        this.tokenService.storeToken(response.accessToken);
      }),
      catchError(err => {
        return new Observable(observer => observer.error(err));
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    if (!this.tokenService.isAuthenticated()) {
      return this.refreshToken().pipe(
        map(() => {
          return true;
        }),
        catchError(() => {
          return of(false);
        })
      );
    }
    return of(true);
  }

  logout(): void {
    this.tokenService.clearStorage();
  }
}
