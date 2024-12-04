import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../services/submission.service';
import { SubmissionForm } from '../entities/SubmissionForm';
import { SelectOption } from '../../../components/arn-select/entities/SelectOption';
import { RoleService } from '../../../services/role.service';
import { take } from 'rxjs';
import { ThesisStore } from '../store/thesis-store.service';
import { Submission } from '../entities/Submission';

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
  ) {}

  ngOnInit(): void {
    this.submissionService.getThesesCategories().pipe(take(1)).subscribe((categories) => {
      this.thesisCategories = categories;
    });

    this.thesisStore.conferenceDetail$.subscribe((conferenceDetail) => {
      this.conferenceId = conferenceDetail.id;
      this.uploadDeadline = conferenceDetail.uploadDeadline;
      this.submission = conferenceDetail.submission;
      console.log('Submission:', this.submission);
      this.handleRoleBasedView();
    });
  }

  onSubmit(): void {
    this.invalidFileAmount = this.uploadedFiles.length !== 2;

    if (this.invalidFileAmount || !this.submissionForm) {
      console.error('Invalid form or file count.');
      return;
    }
    this.submissionForm.conferenceId = this.conferenceId;
    this.submissionService.uploadSubmission(this.submissionForm, this.uploadedFiles).subscribe(
      (response) => {
          this.submission = {
          id: 0,
          title: this.submissionForm.title,
          category: this.submissionForm.category,
          abstractEn: this.submissionForm.abstractEn,
          abstractSk: this.submissionForm.abstractSk,
          coauthors: this.submissionForm.coauthors,
          uploadedFiles: this.uploadedFiles
        } as Submission;
        this.submissionForm = new SubmissionForm();
        this.showInReadMode = true;
      },
      (error) => {
        console.error('Upload error:', error);
      }
    );
  }

  shortenFileName(fileName: string): string {
    return fileName.length > 20 ? `${fileName.slice(0, 20)}...` : fileName;
  }

  downloadFile(file: File): void {
    console.log('Downloading file:', file.name);
  }

  openEditForm(): void {
    this.showInReadMode = false;
    Object.assign(this.submissionForm, {
      title: this.submission.title,
      category: this.submission.category,
      abstractEn: this.submission.abstractEn,
      abstractSk: this.submission.abstractSk,
      coauthors: this.submission.coauthors || []
    });
  }

  getCategoryNameById(id: number): string {
    const category = this.thesisCategories.find(category => category.value === id);
    return category ? category.display : 'Nedostupné';
  }

  private handleRoleBasedView(): void {
    if (this.roleService.isStudent()) {

      console.log('Deadline:', this.uploadDeadline);
      const deadlineDate = new Date(this.uploadDeadline);
      const isInDeadline = new Date() < deadlineDate;

      this.showInReadMode = this.submission !== null;
      this.allowEditation = isInDeadline;
    }
  }
}
