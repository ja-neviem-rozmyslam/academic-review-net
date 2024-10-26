import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from '../../../constants';
import {Observable} from 'rxjs';
import {Login} from '../enitites/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endPoints = "api/users"

  constructor(private http: HttpClient) { }

  login(loginInfo: Login): Observable<any> {
    const body = new URLSearchParams();
    body.set('email', loginInfo.username);
    body.set('password', loginInfo.password);

    return this.http.post(`${apiUrl}${this.endPoints}/login`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
}
