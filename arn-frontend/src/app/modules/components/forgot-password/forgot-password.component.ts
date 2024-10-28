import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.less'
})
export class ForgotPasswordComponent {
  email: string = '';
  countdown: number = 0;
  private countdownInterval: any;

  sendEmail() {
    if (this.email === '') {
      return;
    }
    this.startCountdown();
  }

  startCountdown() {
    this.countdown = 30;
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }
}
