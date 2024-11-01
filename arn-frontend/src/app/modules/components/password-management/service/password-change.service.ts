import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PasswordChangeService {

  private PASSWORD_API_ENDPOINT = '/api/password-reset';

  constructor(private http: HttpClient) { }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.PASSWORD_API_ENDPOINT}/request`, this.createHttpParams({ email }));
  }

  verifyToken(token: string): Observable<any> {
    return this.http.post(`${this.PASSWORD_API_ENDPOINT}/verify`, this.createHttpParams({ token }));
  }

  passwordChange(token: string, password: string): Observable<any> {
    return this.http.post(`${this.PASSWORD_API_ENDPOINT}/confirm`, this.createHttpParams({ token, password }));
  }

  createHttpParams(obj: any): HttpParams {
    return new HttpParams({ fromObject: obj });
  }
}
