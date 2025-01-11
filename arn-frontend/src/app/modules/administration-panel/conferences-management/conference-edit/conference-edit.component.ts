import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ASSIGN,
  EDIT,
  REVIEW_FORM_OPTIONS,
  REVIEW_FORM_SELECT,
  REVIEW_FORM_TEXT,
  SUBMISSION,
  TABOPTIONS
} from '../entities/constants';
import {CONFERENCE_COLUMNS} from './entities/columns'
import {ConferenceManagementService} from '../services/conference-management.service';
import {Conference} from '../../../main-panel/conference-page/entities/Conference';
import {ReviewFormObject} from '../../../main-panel/conference/entities/ReviewFormObject';
@Component({
  selector: 'app-conference-edit',
  templateUrl: './conference-edit.component.html',
  styleUrl: './conference-edit.component.less'
})
export class ConferenceEditComponent implements OnInit {
  conference: Conference;
  tabOptions = TABOPTIONS;
  selectedOption = TABOPTIONS[0].value;

  setPassword: boolean;
  showAlert: boolean;
  alertMessage: string;
  columns = CONFERENCE_COLUMNS;
  submissions: any;
  reviewFieldId = 1;

  constructor(private router: Router, private conferenceService: ConferenceManagementService) {}

  ngOnInit(): void {
    this.conference = window.history.state.item;
    this.getSubmissions();
    if(this.conference == null) {
      this.viewConferences();
    }

    this.setPassword = this.conference.password != null;
    if (this.conference.reviewForm) {
      const lastField = this.conference.reviewForm[this.conference.reviewForm.length - 1];
      this.reviewFieldId = parseInt(lastField.id, 10) + 1;
    }
  }

  getSelectedOption(reviewField: ReviewFormObject) {
    return reviewField.isTextField ? REVIEW_FORM_TEXT : REVIEW_FORM_SELECT;
  }

  addNewField() {
    const newField: ReviewFormObject = {
      id: (this.reviewFieldId++).toString(),
      reviewedCategory: '',
      isTextField: true,
      isSelectionField: false
    };
    this.conference.reviewForm.push(newField);
  }

  onFieldTypeChange(selectedValue: string, field: ReviewFormObject) {
    field.isTextField = selectedValue === REVIEW_FORM_TEXT;
    field.isSelectionField = selectedValue === REVIEW_FORM_SELECT;
  }

  removeField(fieldId: string) {
    this.conference.reviewForm = this.conference.reviewForm.filter(field => field.id !== fieldId);
  }

  getSubmissions() {
    this.conferenceService.getSubmissions(this.conference.id).subscribe({
          next: (data) => {
            this.submissions = data.body;
          }
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
      }
    });
  }

  viewConferences() {
    this.router.navigate(['/administration/conference-management']);
  }

  updateConference() {
    this.conferenceService.saveConference({...this.conference}).subscribe({
      next: () => {
        this.showAlert = true;
        this.alertMessage = "Údaje konferencie boli zmenené.";
        setTimeout(() => this.showAlert= false, 3000);
      }
    });
  }

  protected readonly EDIT = EDIT;
  protected readonly ASSIGN = ASSIGN;
  protected readonly SUBMISSION = SUBMISSION;
  protected readonly REVIEW_FORM_OPTIONS = REVIEW_FORM_OPTIONS;
  protected readonly REVIEW_FORM_TEXT = REVIEW_FORM_TEXT;
}
