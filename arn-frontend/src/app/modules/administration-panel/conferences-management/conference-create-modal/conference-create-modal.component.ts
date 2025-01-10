import {Component} from '@angular/core';
import {BaseModal} from '../../../components/base-modal/entities/BaseModal';
import {Conference} from '../../../main-panel/conference-page/entities/Conference';
import {FormValidationErrors} from '../../../objects/FormValidationErrors';
import {ModalSettings} from '../../../components/base-modal/entities/ModalSettings';
import {ReviewFormObject} from '../../../main-panel/conference/entities/ReviewFormObject';

@Component({
  selector: 'app-conference-create-modal',
  templateUrl: './conference-create-modal.component.html',
  styleUrl: './conference-create-modal.component.less'
})
export class ConferenceCreateModalComponent extends BaseModal {
  conference: Conference = new Conference();
  formValidationErrors: FormValidationErrors;
  setPassword: boolean = false;
  reviewFormFields: ReviewFormObject[] = [];

  modalSettings: ModalSettings = {
    showHeader: true,
    title: 'Vytváranie konferencie',
  }

  addNewField() {
    const newField: ReviewFormObject = {
      id: this.generateId(),
      reviewedCategory: '',
      isTextField: true, // Default to textField
      isSelectionField: false
    };
    this.reviewFormFields.push(newField);
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  onSubmit() {
    console.log(this.formValidationErrors);
  }
}
