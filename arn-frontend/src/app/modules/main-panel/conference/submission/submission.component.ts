import {Component, OnInit} from '@angular/core';
import {SubmissionService} from '../services/submission.service';
import {SubmissionForm} from '../entities/SubmissionForm';
import {SelectOption} from '../../../components/arn-select/entities/SelectOption';
import {RoleService} from '../../../services/role.service';
import {take} from 'rxjs';
import {ThesisStore} from '../store/thesis-store.service';
import {Submission} from '../entities/Submission';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.less'],
})
export class SubmissionComponent implements OnInit {
  conferenceId: number;
  uploadDeadline: string;
  submission: Submission;

  invalidFileAmount = false;
  submissionForm: SubmissionForm = new SubmissionForm();
  uploadedFiles: File[] = [];
  thesisCategories: SelectOption[] = [];
  showInReadMode = true;
  allowEditation = false;

  constructor(
    private submissionService: SubmissionService,
    private roleService: RoleService,
    protected thesisStore: ThesisStore
  ) {
  }

  ngOnInit(): void {
    this.loadThesisCategories();
    this.loadConferenceDetails();
  }

  loadThesisCategories(): void {
    this.submissionService.getThesesCategories().pipe(take(1)).subscribe((categories) => {
      this.thesisCategories = categories;
    });
  }

  onSubmit(): void {
    this.invalidFileAmount = this.uploadedFiles.length !== 2;
    if (!this.invalidFileAmount) {
      this.submissionForm.conferenceId = this.conferenceId;
      this.uploadSubmission();
    }
  }

  uploadSubmission(): void {
    this.submissionService.uploadSubmission(this.submissionForm, this.uploadedFiles).subscribe(
      (result) => this.handleSubmissionSuccess(result.body),
      (error) => console.error('Upload error:', error)
    );
  }

  handleSubmissionSuccess(savedSubmission: Submission): void {
    console.log('Submission saved:', savedSubmission);
    this.submission = {
      id: savedSubmission.id,
      title: savedSubmission.title,
      category: savedSubmission.category,
      abstractEn: savedSubmission.abstractEn,
      abstractSk: savedSubmission.abstractSk
    } as Submission;
    this.submissionForm = new SubmissionForm();
    this.showInReadMode = true;
  }

  shortenFileName(fileName: string): string {
    return fileName.length > 20 ? `${fileName.slice(0, 20)}...` : fileName;
  }

  downloadFile(file: string): void {
    console.log('Downloading file:', file);
  }

  openEditForm(): void {
    this.showInReadMode = false;
    Object.assign(this.submissionForm, {
      id: this.submission.id,
      title: this.submission.title,
      category: this.submission.category,
      abstractEn: this.submission.abstractEn,
      abstractSk: this.submission.abstractSk,
      coauthors: this.submission.coauthors || '',
    });
  }

  getCategoryNameById(id: number): string {
    const category = this.thesisCategories.find((category) => category.value === id);
    return category ? category.display : 'Nedostupné';
  }

  private loadConferenceDetails(): void {
    this.thesisStore.conferenceDetail$.subscribe((conferenceDetail) => {
      this.conferenceId = conferenceDetail.id;
      this.uploadDeadline = conferenceDetail.uploadDeadline;
      this.submission = conferenceDetail.submission;
      this.handleRoleBasedView();
    });
  }


  private handleRoleBasedView(): void {
    if (this.roleService.isStudent()) {
      const isInDeadline = new Date() < new Date(this.uploadDeadline);
      this.showInReadMode = this.submission !== null;
      this.allowEditation = isInDeadline;
    }
  }
}
