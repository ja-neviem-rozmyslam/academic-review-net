import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Modal} from 'flowbite';
import {ModalSettings} from './entities/ModalSettings';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.less'
})
export class BaseModalComponent {
  @Input({ required: true }) modal: Modal;
  @Input() modalWidthClass: string = 'max-w-2xl';
  @Input() modalSettings: ModalSettings = new ModalSettings();
  @Output() acceptCallback = new EventEmitter();
  @Output() cancelCallback = new EventEmitter();

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
