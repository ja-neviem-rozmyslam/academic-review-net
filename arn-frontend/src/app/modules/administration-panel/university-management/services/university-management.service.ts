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

  addDomainToUniversity(universityId: number): Observable<any> {
    return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/${universityId}/add-domain`, {});
  }

  removeDomainFromUniversity(domainId: number): Observable<any> {
    return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/remove-domain/${domainId}`, {});
  }

  saveUniversity(university: any): Observable<any> {
    return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/save`, university);
  }

  addUniversity(): Observable<any> {
    return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/add`, {});
  }

  removeUniversity(universityId: number, university: any): Observable<any> {
    console.log(university);
    return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/${universityId}/remove`, university);
  }
}
