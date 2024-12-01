import {Component, OnInit} from '@angular/core';
import { SubmissionService } from '../../../services/submission.service';
import {ActivatedRoute} from '@angular/router';
import {SubmissionForm} from '../entities/SubmissionForm';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrl: './submission.component.less'
})
export class SubmissionComponent implements OnInit {
  id: number;
  submissionForm: SubmissionForm = new SubmissionForm();

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  onSubmit(): void {
    if (this.id === undefined) {
      console.error('Conference ID is not defined');
      return;
    }
    this.submissionForm.conferenceId = this.id;
    console.log('Submitting form:', this.submissionForm);


    this.submissionService.uploadFiles(this.submissionForm).subscribe(
      response => {
        console.log('Upload response:', response);
      },
      error => {
        console.error('Upload error:', error);
      }
    );
  }
}
