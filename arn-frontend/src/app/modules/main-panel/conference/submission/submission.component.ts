import {Component, OnInit} from '@angular/core';
import { SubmissionService } from '../../../services/submission.service';
import {ActivatedRoute} from '@angular/router';
import {SubmissionForm} from '../entities/SubmissionForm';
import {SelectOption} from '../../../components/arn-select/entities/SelectOption';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrl: './submission.component.less'
})
export class SubmissionComponent implements OnInit {
  id: number;
  invalidFileAmount: boolean = false;
  submissionForm: SubmissionForm = new SubmissionForm();
  uploadedFiles: File[] = [];

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
  }

  onSubmit(): void {
    this.invalidFileAmount = this.uploadedFiles.length !== 2;
    this.submissionForm.conferenceId = this.id;

    if (!this.submissionForm.conferenceId || this.invalidFileAmount) {
      console.error('Conference ID is not defined');
      return;
    }

    this.submissionService.uploadSubmission(this.submissionForm, this.uploadedFiles).subscribe(
      response => {
        console.log('Upload response:', response);
      },
      error => {
        console.error('Upload error:', error);
      }
    );
  }

  onselectCategory(selectedCategory: number): void {
    console.log('Selected category:', selectedCategory);
  }

  protected readonly onselect = onselect;
}
