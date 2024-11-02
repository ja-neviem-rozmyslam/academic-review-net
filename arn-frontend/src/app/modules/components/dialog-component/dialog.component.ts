import {Component, ElementRef, ViewChild} from '@angular/core';
import {Modal} from 'flowbite';
import {CONFIRM, DialogSettings, ERROR, INFO, WARNING} from './entities/DialogSettings';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.less'
})
export class DialogComponent {
  @ViewChild('modal') modalElement!: ElementRef;
  dialogSettings: DialogSettings;
  modal: Modal;

  setDialogInstance(modal: Modal, dialogSettings: DialogSettings) {
    this.dialogSettings = dialogSettings;
    this.modal = modal;
    modal.show();
  }

  onAccept() {
    if (this.dialogSettings.acceptCallback) {
      this.dialogSettings.acceptCallback();
    }
    this.onClose();
  }

  onClose() {
    this.modal.hide();
  }

  getDialogHeaderClass() {
    switch (this.dialogSettings.dialogType) {
      case ERROR:
        return 'bg-lightRed';
      case WARNING:
        return 'bg-lightYellow';
      case CONFIRM:
      case INFO:
        return 'bg-lightGreen';
      default:
        return '';
    }
  }

  protected readonly CONFIRM = CONFIRM;
}
