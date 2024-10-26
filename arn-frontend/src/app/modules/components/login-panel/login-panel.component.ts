import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.less'
})
export class LoginPanelComponent implements OnInit {
  private storageIdentifier: string = 'ARN_STORAGE_EMAIL';
  email: string;
  password: string;
  rememberMe: boolean = false;
  submitted: boolean = false;
  errorMessage: string;

  ngOnInit() {
    const savedEmail = localStorage.getItem(this.storageIdentifier);
    this.email = savedEmail || '';
    this.rememberMe = !!savedEmail;
  }

  onSubmit() {
    this.submitted = true;
    if (this.email && this.password) {
      if (!this.isValidEmail(this.email)) {
        this.errorMessage = 'Neplatný formát emailu';
        this.email = '';
        return;
      }
      if (this.rememberMe)
        localStorage.setItem(this.storageIdentifier, this.email);
      else
        localStorage.removeItem(this.storageIdentifier);
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  openRegistrationPage() {
    console.log();
  }

  passwordResetClicked() {
    console.log();
  }
}
