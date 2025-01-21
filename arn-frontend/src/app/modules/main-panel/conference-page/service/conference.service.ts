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

  constructor(private http: HttpClient) {
  }

  requestConferenceJoin(conferenceId: number, password: string) {
    return this.http.post(`${this.CONFERENCE_API_ENDPOINT}/join/${conferenceId}`, {password});
  }

  getConferences(): Observable<any> {
    return this.http.get(`${this.CONFERENCE_API_ENDPOINT}`);
  }

  getData(id: number, includeCoAuthors = false, endpoint = ''): Observable<any> {
    const params: Record<string, string> = {
      includeCoAuthors: includeCoAuthors.toString(),
    };

    return this.http.get<any>(`${this.CONFERENCE_API_ENDPOINT}/${endpoint}${id}`, { params }).pipe(
      map(data => this.parseConferenceDetail(data))
    );
  }

  getConferenceData(conferenceId: number, includeCoAuthors = false): Observable<ConferenceDetail> {
    return this.getData(conferenceId, includeCoAuthors);
  }

  getSubmissionData(submissionId: number, includeCoAuthors = false): Observable<ConferenceDetail> {
    return this.getData(submissionId, includeCoAuthors, 'submission/');
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
