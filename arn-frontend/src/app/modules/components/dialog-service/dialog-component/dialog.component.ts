import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Modal} from 'flowbite';
import {DialogOptions} from '../entities/DialogOptions';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.less'
})
export class DialogComponent {
  @Input() dialogOptions: DialogOptions = {
    title: '',
    content: '',
    buttonText: {
      confirm: 'Potvrdiť',
      cancel: 'Zrušiť'
    }
  };
  @ViewChild('modal') modalElement!: ElementRef;

  closeButtonClick() {
    const modal = new Modal(this.modalElement.nativeElement);
    modal.hide();
  }

  acceptButtonClick() {
    console.log('Terms accepted');
    this.closeButtonClick();
  }
}
