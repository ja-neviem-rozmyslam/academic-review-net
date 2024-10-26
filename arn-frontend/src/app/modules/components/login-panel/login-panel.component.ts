import {Component, OnInit} from '@angular/core';
import {Login} from './enitites/Login';
import {Store} from '@ngrx/store';
import {loginStart} from './store/auth.actions';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.less'
})
export class LoginPanelComponent implements OnInit {
  loginInfo: Login = new Login('', '');
  private storageIdentifier: string = 'ARN_STORAGE_EMAIL';
  rememberMe: boolean = false;
  submitted: boolean = false;
  errorMessage: string;

  constructor(private store: Store) {
  }

  ngOnInit() {
    const savedEmail = localStorage.getItem(this.storageIdentifier);
    this.loginInfo.username = savedEmail || '';
    this.rememberMe = !!savedEmail;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginInfo.username && this.loginInfo.password) {
      if (!this.isValidEmail(this.loginInfo.username)) {
        this.errorMessage = 'Neplatný formát emailu';
        this.loginInfo.username = '';
        return;
      }
      if (this.rememberMe)
        localStorage.setItem(this.storageIdentifier, this.loginInfo.username);
      else
        localStorage.removeItem(this.storageIdentifier);
      this.store.dispatch(loginStart({ loginInfo: {...this.loginInfo }}));
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
