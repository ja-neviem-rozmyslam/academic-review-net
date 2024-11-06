import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Login} from '../components/login-panel/enitites/Login';
import {Registration} from '../components/registration-panel/entities/Registration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_API_ENDPOINT = "api/users";

  constructor(private http: HttpClient) { }

  login(loginInfo: Login): Observable<any> {
    return this.http.post(`${this.USER_API_ENDPOINT}/login`, loginInfo, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  registration(registrationInfo: Registration): Observable<any> {
    return this.http.post(`${this.USER_API_ENDPOINT}/registration`, registrationInfo, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
