import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ASSIGN,
  EDIT,
  REVIEW_FORM_OPTIONS,
  REVIEW_FORM_SELECT,
  REVIEW_FORM_TEXT,
  SUBMISSION,
  TABOPTIONS,
} from '../entities/constants';
import { ConferenceManagementService } from '../services/conference-management.service';
import { Conference } from '../../../main-panel/conference-page/entities/Conference';
import { ReviewFormObject } from '../../../main-panel/conference/entities/ReviewFormObject';
import { FormValidationErrors } from '../../../objects/FormValidationErrors';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-conference-edit',
  templateUrl: './conference-edit.component.html',
  styleUrls: ['./conference-edit.component.less'],
})
export class ConferenceEditComponent implements OnInit {
  conference: Conference;
  tabOptions = TABOPTIONS;
  selectedOption = TABOPTIONS[0].value;

  isLoading: boolean;

  setPassword: boolean;
  showAlert: boolean;
  alertMessage: string;
  columns = [];
  submissions: any;
  reviewFieldId = 1;
  formValidationErrors: FormValidationErrors;

  constructor(
    private router: Router,
    private conferenceService: ConferenceManagementService,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const conferenceId = this.route.snapshot.paramMap.get('conferenceID');
    if (conferenceId) {
      this.conferenceService.getConferenceById(+conferenceId).subscribe({
        next: (conference) => {
          this.conference = conference;
          this.setPassword = this.conference.password != null;
          if (this.conference.reviewForm) {
            const lastField = this.conference.reviewForm[this.conference.reviewForm.length - 1];
            this.reviewFieldId = parseInt(lastField?.id, 10) + 1 || 1;
          }
          this.getSubmissions();
          this.initializeColumns();
        },
        error: () => {
          this.viewConferences();
        },
      });
    } else {
      this.viewConferences();
    }
  }

  initializeColumns() {
    this.columns = [
      {
        title: 'Názov práce',
        name: 'title',
        width: 30,
      },
      {
        title: 'Študent',
        name: 'author',
        width: 30,
        template: (row) => {
          return row.author === null ? 'Žiadny' : `${row.author.name} ${row.author.surname}`;
        },
      },
      {
        title: 'Recenzent',
        name: 'reviewer',
        width: 30,
        options: [],
        onSelectionChange: (selectedValue: any, dataItem: any) => this.onSelectionChange(selectedValue, dataItem),
        initialValue: (row) => {
          return row.reviewer === null
            ? null
            : { label: `${row.reviewer.name} ${row.reviewer.surname}`, value: row.reviewer.id };
        },
      },
    ];

    this.fetchReviewerOptions();
  }

  fetchReviewerOptions() {
    this.isLoading = true;
    this.conferenceService.getReviewers().subscribe({
      next: (response) => {
        const reviewers = response?.body;
        if (Array.isArray(reviewers)) {
          const reviewerColumn = this.columns.find((col) => col.name === 'reviewer');
          if (reviewerColumn) {
            reviewerColumn.options = reviewers.map((reviewer) => ({
              label: `${reviewer.name} ${reviewer.surname}`,
              value: reviewer.id,
            }));
          }
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch reviewer options:', err);
      },
    });
  }


  isReviewFormDisabled(): boolean {
    return new Date() > new Date(this.conference.reviewDeadline);
  }

  getSelectedOption(reviewField: ReviewFormObject) {
    return reviewField.isTextField ? REVIEW_FORM_TEXT : REVIEW_FORM_SELECT;
  }

  closeConference() {
    this.dialogService.openConfirmDialog(
      'Deaktivácia Konferencie',
      'Ste si istý že chcete zavrieť túto konferenciu? Táto akcia je nezvratná.',
      () => {
        this.conferenceService.closeConference(this.conference.id).subscribe({
          next: () => {
            this.conference.closed = true;
            this.showAlert = true;
            this.alertMessage = 'Konferencia bola zavretá.';
            setTimeout(() => (this.showAlert = false), 3000);
          },
        });
      }
    );
  }

  addNewField() {
    const newField: ReviewFormObject = {
      id: (this.reviewFieldId++).toString(),
      reviewedCategory: '',
      isTextField: true,
      isSelectionField: false,
    };
    this.conference.reviewForm.push(newField);
  }

  onFieldTypeChange(selectedValue: string, field: ReviewFormObject) {
    field.isTextField = selectedValue === REVIEW_FORM_TEXT;
    field.isSelectionField = selectedValue === REVIEW_FORM_SELECT;
  }

  removeField(fieldId: string) {
    this.conference.reviewForm = this.conference.reviewForm.filter((field) => field.id !== fieldId);
  }

  getSubmissions() {
    this.conferenceService.getSubmissions(this.conference.id).subscribe({
      next: (data) => {
        this.submissions = data.body;
      },
    });
  }

  downloadData() {
    this.conferenceService.downloadData(this.conference.id).subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `konferencia-${this.conference.id}.zip`;
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Nastal problém pri sťahovaní súborov: ', err);
      },
    });
  }

  viewConferences() {
    this.router.navigate(['/administration/conference-management']);
  }

  updateConference() {
    if (!this.formValidationErrors) {
      this.conferenceService.saveConference({ ...this.conference }).subscribe({
        next: () => {
          this.showAlert = true;
          this.alertMessage = 'Údaje konferencie boli zmenené.';
          setTimeout(() => (this.showAlert = false), 3000);
        },
      });
    }
  }

  onSelectionChange(selectedValue: any, dataItem: any) {
    this.isLoading = true;
    this.conferenceService.assignReviewer(dataItem.id, selectedValue[0].value).subscribe({
      next: () => {
        this.showAlert = true;
        this.alertMessage = 'Recenzent bol priradený.';
        setTimeout(() => (this.showAlert = false), 3000);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to assign reviewer:', err);
      },
    });
  }

  protected readonly EDIT = EDIT;
  protected readonly ASSIGN = ASSIGN;
  protected readonly SUBMISSION = SUBMISSION;
  protected readonly REVIEW_FORM_OPTIONS = REVIEW_FORM_OPTIONS;
  protected readonly REVIEW_FORM_TEXT = REVIEW_FORM_TEXT;
}
