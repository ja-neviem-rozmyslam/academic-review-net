import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
    const params = new HttpParams({ fromObject: { ...loginInfo } });

    return this.http.post(`${apiUrl}${this.endPoints}/login`, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
}
