import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Modal} from 'flowbite';
import {ModalSettings} from './entities/ModalSettings';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.less'
})
export class BaseModalComponent {
  @Input() modalSettings: ModalSettings = new ModalSettings();
  @Output() acceptCallback = new EventEmitter();
  @Output() cancelCallback = new EventEmitter();
  modal: Modal;

  setModalInstance(modal: Modal) {
    this.modal = modal;
    modal.show();
  }

  onAccept() {
    this.acceptCallback.emit();
    this.closeModal();
  }

  onCancel() {
    this.cancelCallback.emit();
    this.closeModal();
  }

  closeModal() {
    this.modal.hide();
  }
}
