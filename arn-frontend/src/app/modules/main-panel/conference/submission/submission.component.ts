import {Component} from '@angular/core';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrl: './submission.component.less'
})
export class SubmissionComponent {
  uploadedFiles: File[] = [];


  onSubmit(): void {
    console.log('Submitted files:', this.uploadedFiles);
  }
}
