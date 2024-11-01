import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Modal} from 'flowbite';

@Component({
  selector: 'app-password-changed-dialog',
  templateUrl: './password-changed-dialog.component.html',
  styleUrls: ['./password-changed-dialog.component.less']
})
export class PasswordChangedDialogComponent {
  countdown: number = 15;
  modal: Modal;

  constructor(private router: Router) {
  }

  setModalInstance(modal: Modal) {
    this.modal = modal;
    modal.show();
    this.startTimer();
  }

  navigateToLogin() {
    this.modal.hide();
    this.router.navigate(['/login']);
  }

  private startTimer() {
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
        this.navigateToLogin();
      }
    }, 1000);
  }
}
