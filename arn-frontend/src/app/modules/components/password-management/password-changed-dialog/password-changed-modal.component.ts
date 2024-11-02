import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalSettings} from '../../base-modal/entities/ModalSettings';
import {BaseModalComponent} from '../../base-modal/base-modal.component';

@Component({
  selector: 'app-password-changed-dialog',
  templateUrl: './password-changed-modal.component.html',
  styleUrls: ['./password-changed-modal.component.less']
})
export class PasswordChangedModalComponent extends BaseModalComponent implements OnInit {
  modalSettings: ModalSettings;
  countdown: number = 15;

  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.modalSettings = {
      showHeader: false,
      showFooter: false,
    } as ModalSettings;
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
