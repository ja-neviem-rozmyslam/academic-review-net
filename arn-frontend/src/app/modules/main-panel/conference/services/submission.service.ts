import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubmissionForm } from '../entities/SubmissionForm';
import {map} from 'rxjs/operators';

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

  getSubmissionFiles(submissionId: number): Observable<string[]> {
    return this.http.get<string[]>(`/api/submissions/files/${submissionId}`);
  }

  downloadFile(submissionId: number, filename: string): Observable<Blob> {
    return this.http.get(`${this.SUBMISSION_API_ENDPOINT}/files/${submissionId}/${filename}`, {
      responseType: 'blob',
    });
  }

  getThesesCategories(): Observable<any> {
    return this.http.get<any[]>(`${this.SUBMISSION_API_ENDPOINT}/categories`).pipe(
      map(categories =>
        categories.map(category => ({
          value: category.id,
          display: category.categoryName,
        }))
      )
    );
  }
}
