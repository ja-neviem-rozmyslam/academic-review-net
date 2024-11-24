import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  USER_API_ENDPOINT = 'api/conference';

  constructor(private http: HttpClient) {
  }

  requestConferenceJoin(conferenceId: number, password: string) {
    return this.http.post(`${this.USER_API_ENDPOINT}/conferences/${conferenceId}/join`, {password});
  }

  getConferences() {
    return this.http.get(`${this.USER_API_ENDPOINT}/conferences`);
  }
}
