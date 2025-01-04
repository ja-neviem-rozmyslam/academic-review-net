import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferenceManagementService {
  ADMIN_CONFERENCE_ENDPOINT = 'admin/conference';

  constructor(private http: HttpClient) {
  }

  getConferences(searchObject: any, sortOptions: any): Observable<any> {
    const params = {
      sortColumn: sortOptions.column,
      sortDirection: sortOptions.direction
    };

    return this.http.post(`${this.ADMIN_CONFERENCE_ENDPOINT}`, searchObject, {
      headers: { 'Content-Type': 'application/json' },
      params: params
    });
  }
}
