import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubmissionForm } from '../entities/SubmissionForm';
import {map} from 'rxjs/operators';
import {MyThesis} from '../../my-theses/entities/MyThesis';
import {Submission} from '../entities/Submission';
import {ReviewBlock} from '../entities/Review';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private SUBMISSION_API_ENDPOINT = 'api/submissions';

  constructor(private http: HttpClient) {}

  saveSubmission(submissionForm: SubmissionForm, uploadedFiles: File[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('submissionRequest', new Blob([JSON.stringify(submissionForm)], { type: 'application/json' }));
    uploadedFiles.forEach((file) => {
      formData.append('uploadedFiles', file, file.name);
    });

    return this.http.post(`${this.SUBMISSION_API_ENDPOINT}/upload`, formData, {
      headers: { 'enctype': 'multipart/form-data' }
    });
  }

  saveReview(submissionId: number, reviewBlocks: ReviewBlock[]): Observable<any> {
    return this.http.post(`${this.SUBMISSION_API_ENDPOINT}/reviews/${submissionId}`, reviewBlocks, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getReview(submissionId: number): Observable<ReviewBlock[]> {
    return this.http.get<ReviewBlock[]>(`${this.SUBMISSION_API_ENDPOINT}/reviews/${submissionId}`);
  }

  getSubmissionFiles(submissionId: number): Observable<string[]> {
    return this.http.get<string[]>(`/api/submissions/files/${submissionId}`);
  }

  downloadFile(submissionId: number, filename: string): Observable<Blob> {
    return this.http.get(`${this.SUBMISSION_API_ENDPOINT}/files/${submissionId}/${filename}`, {
      responseType: 'blob',
    });
  }

  getSubmission(submissionId: number): Observable<Submission> {
    return this.http.get<Submission>(`${this.SUBMISSION_API_ENDPOINT}/submission/${submissionId}`);
  }

  getUserSubmissions(submissionsForReview: boolean): Observable<MyThesis[]> {
    return this.http.get<any[]>(`${this.SUBMISSION_API_ENDPOINT}/userSubmissions`, {
      params: { submissionsForReview: submissionsForReview.toString() }
    }).pipe(
      map(response => response.map(item => ({
        ...item.submission,
        isClosed: item.isClosed
      })))
    );
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
