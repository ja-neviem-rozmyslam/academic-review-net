import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SubmissionService} from '../services/submission.service';
import {SubmissionForm} from '../entities/SubmissionForm';
import {SelectOption} from '../../../components/arn-select/entities/SelectOption';
import {Submission} from '../entities/Submission';
import {ConferenceDetail} from '../entities/ConferenceDetail';
import {UserRoles} from '../../../constants';
import {saveAs} from 'file-saver';
import {FormValidationErrors} from '../../../objects/FormValidationErrors';
import {ConferenceStore} from '../../conference-page/store/conferences-store.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.less'],
})
export class SubmissionComponent implements OnInit {
  @Input() thesisCategories: SelectOption[] = [];
  @Input() conferenceDetail: ConferenceDetail;
  @Input() roleInConference: string;
  @Input() submissionOptions: any;

  @ViewChild('submissionReadTemplate', {static: true}) submissionReadTemplate: TemplateRef<any>;
  @ViewChild('submissionFormTemplate', {static: true}) submissionFormTemplate: TemplateRef<any>;
  @ViewChild('noSubmissionTemplate', {static: true}) noSubmissionTemplate: TemplateRef<any>;

  submissionForm: SubmissionForm = new SubmissionForm();
  invalidFileAmount = false;
  uploadedFiles: File[] = [];
  showInReadMode: boolean;

  formValidationErrors: FormValidationErrors;

  constructor(
    private submissionService: SubmissionService, private conferencesStore: ConferenceStore) {
  }

  ngOnInit(): void {
    this.conferencesStore.initThesisCategories();
    this.showInReadMode = this.submissionOptions.isUploaded;
    if (this.showInReadMode) {
      this.retrieveFiles(this.conferenceDetail.submission.id);
    }

  }

  onSubmit(): void {
    this.invalidFileAmount = this.uploadedFiles.length !== 2;
    if (!this.invalidFileAmount && !this.formValidationErrors) {
      this.submissionForm.conferenceId = this.conferenceDetail.id;
      this.uploadSubmission();
    }
  }

  uploadSubmission(): void {
    this.submissionService.saveSubmission(this.submissionForm, this.uploadedFiles).subscribe(
      (result) => this.handleSubmissionSuccess(result as Submission),
      (error) => console.error('Upload error:', error)
    );
  }

  handleSubmissionSuccess(savedSubmission: Submission): void {
    this.conferenceDetail.submission = savedSubmission;
    this.submissionForm = new SubmissionForm();
    this.showInReadMode = true;
  }

  getFileShortName(fileName: string): string {
    if (fileName.length <= 20) {
      return fileName;
    }
    const extension = fileName.slice(fileName.lastIndexOf('.'));
    const namePart = fileName.slice(0, 20 - extension.length);
    return `${namePart}... ${extension}`;
  }

  downloadFile(file: File): void {
    this.submissionService.downloadFile(this.conferenceDetail.submission.id, file.name).subscribe(
      (blob) => {
        saveAs(blob, file.name);
      },
      (error) => console.error('Error downloading file:', error)
    );
  }

  retrieveFiles(submissionId: number): void {
    this.submissionService.getSubmissionFiles(submissionId).subscribe(
      (filePaths: string[]) => {
        this.uploadedFiles = filePaths.map((path) => {
          const fileName = path.split('\\').pop();
          return new File([], fileName);
        });
      },
      (error) => {
        console.error('Error retrieving files:', error);
        this.uploadedFiles = [];
      }
    );
  }

  openEditForm(): void {
    this.submissionService.getSubmission(this.conferenceDetail.submission.id).subscribe((submissionResponse) => {
      this.submissionForm = submissionResponse;
      this.showInReadMode = false;
    });
  }

  getCategoryNameById(id: number): string {
    const category = this.thesisCategories.find((category) => category.value === id);
    return category ? category.display : 'Nedostupné';
  }

  getTemplate(): any {
    if (this.roleInConference === UserRoles.STUDENT) {
      if (this.showInReadMode) {
        return this.submissionReadTemplate;
      } else if (!this.showInReadMode && this.submissionOptions.isBeforeDeadline) {
        return this.submissionFormTemplate;
      } else {
        return this.noSubmissionTemplate;
      }
    } else if (this.roleInConference === UserRoles.REVIEWER) {
      if (this.showInReadMode) {
        return this.submissionReadTemplate;
      } else {
        return this.noSubmissionTemplate;
      }
    }
    return null;
  }
}

