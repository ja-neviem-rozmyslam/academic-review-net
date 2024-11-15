import {Component} from '@angular/core';
import {CONFIRM, DialogSettings, ERROR, INFO, WARNING} from './entities/DialogSettings';
import {BaseModal} from '../base-modal/entities/BaseModal';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.less'
})
export class DialogComponent extends BaseModal {
  dialogSettings: DialogSettings = new DialogSettings();

  setDialogInstance(dialogSettings: DialogSettings) {
    this.dialogSettings = dialogSettings;
    if (dialogSettings.dialogType === CONFIRM) {
      this.modalSettings.showFooter = true;
    }
  }

  onAccept() {
    if (this.dialogSettings.acceptCallback) {
      this.dialogSettings.acceptCallback();
    }
  }

  getDialogHeaderClass() {
    switch (this.dialogSettings.dialogType) {
      case ERROR:
        return 'text-lightRed';
      case WARNING:
        return 'text-lightYellow';
      case CONFIRM:
      case INFO:
        return 'text-lightGreen';
      default:
        return '';
    }
  }
}
