import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferenceEditService {

  ADMIN_CONFERENCE_ENDPOINT = 'api-admin/conference';

  constructor(private http:HttpClient) { }

  saveConference(conferenceId: number, conference: any): Observable<any> {
      return this.http.post<any>(`${this.ADMIN_CONFERENCE_ENDPOINT}/${conferenceId}/update`, conference);
  }

}
