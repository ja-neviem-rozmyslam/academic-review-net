import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConferenceDetail} from '../../conference/entities/ConferenceDetail';


@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  CONFERENCE_API_ENDPOINT = 'api/conferences';
  endpoint: string;

  constructor(private http: HttpClient) {
  }

  requestConferenceJoin(conferenceId: number, password: string) {
    return this.http.post(`${this.CONFERENCE_API_ENDPOINT}/join/${conferenceId}`, {password});
  }

  getConferences(): Observable<any> {
    return this.http.get(`${this.CONFERENCE_API_ENDPOINT}`);
  }

  getConferenceData(conferenceId: number, submissionId?: number, includeCoAuthors = false): Observable<ConferenceDetail> {
    const params: { [key: string]: string } = {
      includeCoAuthors: includeCoAuthors.toString(),
    };
    if (submissionId !== undefined) {
      params['submissionId'] = submissionId.toString();
    }

    return this.http.get<ConferenceDetail>(`${this.CONFERENCE_API_ENDPOINT}/${conferenceId}`, { params }).pipe(
      map(conferenceDetail => this.parseConferenceDetail(conferenceDetail))
    );
  }

  private parseConferenceDetail(conferenceDetail: ConferenceDetail): ConferenceDetail {
    if (typeof conferenceDetail.reviewForm === 'string') {
      conferenceDetail.reviewForm = JSON.parse(conferenceDetail.reviewForm);
    }
    if (typeof conferenceDetail.review === 'string') {
      conferenceDetail.review = JSON.parse(conferenceDetail.review);
    }
    return conferenceDetail;
  }

}
