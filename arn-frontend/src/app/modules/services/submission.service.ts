import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SubmissionForm } from '../main-panel/conference/entities/SubmissionForm';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  SUBMISSION_API_ENDPOINT = 'api/submissions';

  constructor(private http: HttpClient) {}

  uploadFiles(submissionForm: SubmissionForm): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('submissionRequest', new Blob([JSON.stringify(submissionForm)], { type: 'application/json' }));
    submissionForm.uploadedFiles.forEach((file) => {
      formData.append('uploadedFiles', file, file.name);
    });

    return this.http.post(`${this.SUBMISSION_API_ENDPOINT}/upload`, formData, { observe: 'response' }).pipe(
      map(response => response.body),
      catchError(error => {
        console.error('Upload error:', error);
        return of(null);
      })
    );
  }
}
