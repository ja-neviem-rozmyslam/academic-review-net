import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Modal} from 'flowbite';
import {CONFIRM, DialogOptions, ERROR, INFO, WARNING} from '../entities/DialogOptions';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.less'
})
export class DialogComponent {
  @ViewChild('modal') modalElement!: ElementRef;
  @Input() dialogOptions: DialogOptions = {
    title: '',
    content: '',
    dialogType: INFO,
    buttonText: {
      confirm: 'Potvrdiť',
      cancel: 'Zrušiť'
    }
  };
  modal: Modal;

  setModalInstance(modal: Modal) {
    this.modal = modal;
    modal.show();
  }

  onAccept() {
    if (this.dialogOptions.acceptCallback) {
      this.dialogOptions.acceptCallback();
    }
    this.onClose();
  }

  onClose() {
    this.modal.hide();
  }

  getDialogHeaderClass() {
    switch (this.dialogOptions.dialogType) {
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
