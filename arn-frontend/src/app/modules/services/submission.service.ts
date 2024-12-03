import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubmissionForm } from '../main-panel/conference/entities/SubmissionForm';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private SUBMISSION_API_ENDPOINT = 'api/submissions';

  constructor(private http: HttpClient) {}

  uploadSubmission(submissionForm: SubmissionForm, uploadedFiles: File[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('submissionRequest', new Blob([JSON.stringify(submissionForm)], { type: 'application/json' }));
    uploadedFiles.forEach((file) => {
      formData.append('uploadedFiles', file, file.name);
    });

    return this.http.post(`${this.SUBMISSION_API_ENDPOINT}/upload`, formData, { observe: 'response' });
  }

  getSubmission(conferenceId: number): Observable<any> {
    return this.http.get<any>(`${this.SUBMISSION_API_ENDPOINT}/${conferenceId}`);
  }
}
