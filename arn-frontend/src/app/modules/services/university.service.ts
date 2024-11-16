import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  UNIVERSITY_API_ENDPOINT = 'api/universities';

  constructor(private http: HttpClient) {
  }

  getUniversities(): Observable<any> {
    return this.http.get(`${this.UNIVERSITY_API_ENDPOINT}/all`, {
      headers: {'Content-Type': 'application/json'}
    });
  }

}
