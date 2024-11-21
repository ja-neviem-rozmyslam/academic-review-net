import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_API_ENDPOINT = 'api/conference';

  constructor(private http: HttpClient) {
  }

  getConferences() {
    return this.http.get(`${this.USER_API_ENDPOINT}/conferences`);
  }
}
