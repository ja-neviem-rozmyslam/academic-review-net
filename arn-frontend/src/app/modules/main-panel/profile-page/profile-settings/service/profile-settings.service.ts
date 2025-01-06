import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileSettingsService {

  constructor(private http: HttpClient) {}

  sendPasswordReset(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`/api/password-reset/request`, null, { params });
  }

  updateProfile(userDetails: any): Observable<any> {
    return this.http.post(`/api/users/update-profile`, userDetails);
  }
}
