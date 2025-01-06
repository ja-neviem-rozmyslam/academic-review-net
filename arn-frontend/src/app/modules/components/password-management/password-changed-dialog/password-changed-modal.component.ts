import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BaseModal} from '../../base-modal/entities/BaseModal';

@Component({
  selector: 'app-password-changed-dialog',
  templateUrl: './password-changed-modal.component.html',
  styleUrls: ['./password-changed-modal.component.less']
})
export class PasswordChangedModalComponent extends BaseModal implements OnInit {
  countdown: number = 15;

  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.modalSettings.hideCloseButton = true;
    this.startTimer();
  }

  navigateToLogin() {
    this.closeModal();
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
