import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  CONFERENCE_API_ENDPOINT = 'api/conferences';

  constructor(private http: HttpClient) {
  }

  requestConferenceJoin(conferenceId: number, password: string) {
    return this.http.post(`${this.CONFERENCE_API_ENDPOINT}/join/${conferenceId}`, {password});
  }

  getConferences(): Observable<any> {
    return this.http.get(`${this.CONFERENCE_API_ENDPOINT}`);
  }

  getConferenceData(conferenceId: number, includeCoAuthors = false): Observable<any> {
    return this.http.get(`${this.CONFERENCE_API_ENDPOINT}/${conferenceId}`, {
      params: { includeCoAuthors: includeCoAuthors.toString() }
    });
  }
}
