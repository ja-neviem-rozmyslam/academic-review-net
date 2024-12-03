import {Component, Input} from '@angular/core';
import {SubmissionService} from '../../../services/submission.service';
import {SubmissionForm} from '../entities/SubmissionForm';
import {SelectOption} from '../../../components/arn-select/entities/SelectOption';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.less']
})
export class SubmissionComponent {
  invalidFileAmount: boolean = false;

  submissionForm: SubmissionForm = new SubmissionForm();
  uploadedFiles: File[] = [];

  thesisTypes: SelectOption[] = [
    {value: 1, display: 'Bakalárska práca'},
    {value: 2, display: 'Diplomová práca'},
    {value: 3, display: 'Dizertačná práca'}
  ];

  constructor(
    private submissionService: SubmissionService
  ) {
  }

  onSubmit(): void {
    this.invalidFileAmount = this.uploadedFiles.length !== 2;

    if (!this.submissionForm.conferenceId || this.invalidFileAmount) {
      console.error('Conference ID is not defined');
      return;
    }

    this.submissionService.uploadSubmission(this.submissionForm, this.uploadedFiles).subscribe(
      (response) => {
        console.log('Upload response:', response);
        this.submissionReadMode = true;
        this.submission = response; //Tu na response pri úspešnom uploadnutí namapujeme objekt submissionu a vrátime ho v response. Aby sme nemuseli robiť zbytočne další request
      },
      (error) => {
        console.error('Upload error:', error);
      }
    );
  }
}
