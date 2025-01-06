import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {
  USER_API_ENDPOINT = 'api/users';

  constructor(private http: HttpClient) {
  }

  getUserDetail(): Observable<any> {
    return this.http.get(`${this.USER_API_ENDPOINT}/get-profile`);
  }
}
