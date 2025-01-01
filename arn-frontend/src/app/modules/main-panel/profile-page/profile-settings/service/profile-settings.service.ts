import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileSettingsService {
  private PROFILE_API_ENDPOINT = '';

  constructor(private http: HttpClient) {}

  sendPasswordReset(email: string): Observable<any> {
    return this.http.post(`/api/password-reset/request`, { email });
  }
}
