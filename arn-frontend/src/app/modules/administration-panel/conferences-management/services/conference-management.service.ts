import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferenceManagementService {
  ADMIN_CONFERENCE_ENDPOINT = 'api-admin/conference';

  constructor(private http: HttpClient) {
  }

  getConferences(searchObject: any, sortOptions: any): Observable<any> {
    const params = {
      column: sortOptions.column,
      direction: sortOptions.direction
    };

    return this.http.post(`${this.ADMIN_CONFERENCE_ENDPOINT}`, searchObject, {
      headers: {'Content-Type': 'application/json'},
      params: params
    });
  }

  downloadData(conferenceId: number): Observable<Blob> {
    return this.http.get(`${this.ADMIN_CONFERENCE_ENDPOINT}/${conferenceId}/download`, {
      responseType: 'blob'
    });
  }

  saveConference(conferenceId: number, conference: any): Observable<any> {
    return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/${conferenceId}/update`, conference);
  }

  getSubmissions(conferenceId: number): Observable<any> {
    return this.http.get<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/${conferenceId}/submissions`);
  }
}
