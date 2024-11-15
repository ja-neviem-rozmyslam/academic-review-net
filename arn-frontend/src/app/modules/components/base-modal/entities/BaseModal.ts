import {ModalSettings} from './ModalSettings';
import {Modal} from 'flowbite';

export class BaseModal {
  modalSettings: ModalSettings;
  modalInstance: Modal;

  constructor() {
    this.modalSettings = new ModalSettings();
  }

  setModalInstance(modal: Modal) {
    this.modalInstance = modal;
    modal.show();
  }

  closeModal() {
    this.modalInstance.hide();
  }
}
