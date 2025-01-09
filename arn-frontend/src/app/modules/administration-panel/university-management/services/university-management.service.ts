import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityManagementService {
  ADMIN_CONFERENCE_ENDPOINT = 'api-admin/university';

  constructor(private http: HttpClient) {
  }

  getAllUniversities(): Observable<any> {
    return this.http.get<any>(this.ADMIN_CONFERENCE_ENDPOINT);
  }

  saveUniversity(university: any): Observable<any> {
    return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/save`, university);
  }

  removeUniversity(universityId: number, university: any): Observable<any> {
    console.log(university);
    return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/${universityId}/remove`, university);
  }
}
