import {Component, EventEmitter, Output} from '@angular/core';
import { BaseModal } from '../../../components/base-modal/entities/BaseModal';
import { Conference } from '../../../main-panel/conference-page/entities/Conference';
import { FormValidationErrors } from '../../../objects/FormValidationErrors';
import { ModalSettings } from '../../../components/base-modal/entities/ModalSettings';
import { ReviewFormObject } from '../../../main-panel/conference/entities/ReviewFormObject';
import { REVIEW_FORM_OPTIONS, REVIEW_FORM_SELECT, REVIEW_FORM_TEXT } from '../entities/constants';
import {ConferenceManagementService} from '../services/conference-management.service';

@Component({
  selector: 'app-conference-create-modal',
  templateUrl: './conference-create-modal.component.html',
  styleUrls: ['./conference-create-modal.component.less']
})
export class ConferenceCreateModalComponent extends BaseModal {

  @Output() conferenceCreated = new EventEmitter<void>();
  conference: Conference = new Conference();
  formValidationErrors: FormValidationErrors;
  setPassword: boolean = false;
  private reviewFieldId: number = 1;

  modalSettings: ModalSettings = {
    showHeader: true,
    title: 'Vytváranie konferencie',
  };

  addNewField() {
    const newField: ReviewFormObject = {
      id: (this.reviewFieldId++).toString(),
      reviewedCategory: '',
      isTextField: true,
      isSelectionField: false
    };
    this.conference.reviewForm.push(newField);
  }

  constructor (private conferenceService: ConferenceManagementService) {
    super();
  }

  onFieldTypeChange(selectedValue: string, field: ReviewFormObject) {
    field.isTextField = selectedValue === REVIEW_FORM_TEXT;
    field.isSelectionField = selectedValue === REVIEW_FORM_SELECT;
  }

  removeField(fieldId: string) {
    this.conference.reviewForm = this.conference.reviewForm.filter(field => field.id !== fieldId);
  }

  onSubmit() {
    if (!this.formValidationErrors) {
      this.conferenceService.saveConference({...this.conference}).subscribe(() => {
        this.closeModal();
        this.conferenceCreated.emit();
      });
    }
  }

  protected readonly REVIEW_FORM_OPTIONS = REVIEW_FORM_OPTIONS;
  protected readonly REVIEW_FORM_TEXT = REVIEW_FORM_TEXT;
}
