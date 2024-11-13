import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Login} from '../components/login-panel/enitites/Login';
import {Registration} from '../components/registration-panel/entities/Registration';
import {map} from 'rxjs/operators';
import {LoginResponse} from '../objects/LoginResponse';
import {UserRoles} from '../constants';
import {TokenService} from './token.service';
import {RoleService} from './role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_API_ENDPOINT = 'api/auth';
  private authStatus = new BehaviorSubject<boolean>(this.tokenService.isAuthenticated());

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private roleService: RoleService
  ) { }

  login(loginInfo: Login): Observable<any> {
    return this.http.post<LoginResponse>(`${this.USER_API_ENDPOINT}/login`, loginInfo, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(({ user, token }) => {
        this.tokenService.storeToken(token);
        this.roleService.storeRoles([UserRoles.STUDENT]);
        this.authStatus.next(true);
        return { user };
      })
    );
  }

  registration(registrationInfo: Registration): Observable<any> {
    return this.http.post(`${this.USER_API_ENDPOINT}/registration`, registrationInfo, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  logout(): void {
    this.tokenService.removeToken();
    this.authStatus.next(false);
  }
}

