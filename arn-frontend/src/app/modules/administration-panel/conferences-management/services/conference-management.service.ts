import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Conference} from '../../../main-panel/conference-page/entities/Conference';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConferenceManagementService {
  ADMIN_CONFERENCE_ENDPOINT = 'api-admin/conference';

  constructor(private http: HttpClient) {
  }

  getConferences(searchObject: any, sortOptions: any): Observable<Conference[]> {
    const params = {
      column: sortOptions.column,
      direction: sortOptions.direction
    };

    return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}`, searchObject, {
      headers: {'Content-Type': 'application/json'},
      params: params
    }).pipe(
      map((data: any) => this.parseConferences(data))
    );
  }

  getConferenceById(conferenceId: number): Observable<Conference> {
    return this.http.get<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/${conferenceId}`).pipe(
      map((data: any) => this.parseConferences([data])[0])
    );
  }

  closeConference(conferenceId: number): Observable<any> {
    return this.http.get<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/${conferenceId}/close`);
  }

  downloadData(conferenceId: number): Observable<Blob> {
    return this.http.get(`${this.ADMIN_CONFERENCE_ENDPOINT}/${conferenceId}/download`, {
      responseType: 'blob'
    });
  }

  saveConference(conference: any): Observable<any> {
    conference.reviewForm = JSON.stringify(conference.reviewForm);
    return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/update`, conference);
  }

  getSubmissions(conferenceId: number): Observable<any> {
    return this.http.get<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/${conferenceId}/submissions`);
  }


  private parseConferences(conferences: any[]): Conference[] {
    return conferences.map(conference => {
      if (typeof conference.reviewForm === 'string') {
        conference.reviewForm = JSON.parse(conference.reviewForm);
      }
      return conference;
    });
  }

  assignReviewer(submissionId: number, reviewerId: string) {
    return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/${submissionId}/assign-reviewer/${reviewerId}`, {});
  }

  getReviewers(): Observable<any> {
    return this.http.get<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/reviewers`);
  }
}
