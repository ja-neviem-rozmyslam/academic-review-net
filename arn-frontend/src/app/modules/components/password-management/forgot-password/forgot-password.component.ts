import {Component} from '@angular/core';
import {PasswordChangeService} from '../service/password-change.service';
import {StatusMessages} from '../../../constants';
import {DialogService} from '../../../services/dialog.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.less',
  providers: [PasswordChangeService]
})
export class ForgotPasswordComponent {
  private countdownInterval: any;
  email: string = '';
  countdown: number = 0;

  constructor(private passwordChangeService: PasswordChangeService, private dialogService: DialogService) {
  }

  sendEmail() {
    if (this.email === '') {
      return;
    }
    this.passwordChangeService.requestPasswordReset(this.email).subscribe(
      () => {
        this.dialogService.openInfoDialog('Formulár zmeny hesla','Email s inštrukciami na obnovenie hesla bol odoslaný.');
        this.startCountdown();
      }, (error) => {
        if (error.error === StatusMessages.TOO_MANY_REQUESTS) {
          this.dialogService.openErrorDialog('Príliš veľa požiadaviek. Skúste to znova neskôr.');
        }
      }
    );
  }

  private startCountdown() {
    this.countdown = 60;
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
