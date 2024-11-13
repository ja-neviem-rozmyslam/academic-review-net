import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Login} from '../components/login-panel/enitites/Login';
import {Registration} from '../components/registration-panel/entities/Registration';
import {map} from 'rxjs/operators';
import {LoginResponse} from '../objects/LoginResponse';
import {UserRoles} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_API_ENDPOINT = "api/auth";
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticatedInStorage());

  constructor(private http: HttpClient) { }

  login(loginInfo: Login): Observable<any> {
    return this.http.post<LoginResponse>(`${this.USER_API_ENDPOINT}/login`, loginInfo, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(({ user, token }) => {
        this.storeToken(token);
        this.storeRoles([UserRoles.ADMIN]);
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

  logout(): void {
    localStorage.removeItem('authToken');
    this.authStatus.next(false);
  }

  private storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  private storeRoles(roles: string[]): void {
    localStorage.setItem('authRoles', JSON.stringify(roles));
  }

  getRoles(): string[] | null {
    const roles = localStorage.getItem('authRoles');
    return roles ? JSON.parse(roles) : null;
  }

  hasRole(role: string | string[]): boolean {
    const roles = this.getRoles();
    if (!roles) return false;

    if (Array.isArray(role)) {
      return role.some(r => roles.includes(r));
    }
    return roles.includes(role);
  }


  private isAuthenticatedInStorage(): boolean {
    console.log(!!localStorage.getItem('authToken'));
    // Check token expiration
    return !!localStorage.getItem('authToken');
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
}
