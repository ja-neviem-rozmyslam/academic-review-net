import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../../../services/submission.service';
import { ActivatedRoute } from '@angular/router';
import { SubmissionForm } from '../entities/SubmissionForm';
import { SelectOption } from '../../../components/arn-select/entities/SelectOption';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.less']
})
export class SubmissionComponent implements OnInit {
  id: number;
  invalidFileAmount: boolean = false;
  submissionForm: SubmissionForm = new SubmissionForm();
  uploadedFiles: File[] = [];
  existingSubmission: any = null;
  errorMessage: string = '';

  thesisTypes: SelectOption[] = [
    { value: 1, display: 'Bakalárska práca' },
    { value: 2, display: 'Diplomová práca' },
    { value: 3, display: 'Dizertačná práca' }
  ];

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fetchExistingSubmission();
  }

  fetchExistingSubmission(): void {
    this.submissionService.getSubmission(this.id).subscribe({
      next: (data) => (this.existingSubmission = data),
      error: (err) => (this.errorMessage = err.message),
    });
  }


  onSubmit(): void {
    this.invalidFileAmount = this.uploadedFiles.length !== 2;
    this.submissionForm.conferenceId = this.id;

    if (!this.submissionForm.conferenceId || this.invalidFileAmount) {
      console.error('Conference ID is not defined');
      return;
    }

    this.submissionService.uploadSubmission(this.submissionForm, this.uploadedFiles).subscribe(
      (response) => {
        console.log('Upload response:', response);
        this.fetchExistingSubmission();
      },
      (error) => {
        console.error('Upload error:', error);
      }
    );
  }

  onselectCategory(selectedCategory: number): void {
    console.log('Selected category:', selectedCategory);
  }
}
