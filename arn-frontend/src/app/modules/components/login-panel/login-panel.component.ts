import {Component, OnDestroy, OnInit} from '@angular/core';
import {Login} from './enitites/Login';
import {Store} from '@ngrx/store';
import {loginStart} from './store/auth.actions';
import {Observable, Subscription} from 'rxjs';
import {selectError} from './store/auth.selector';
import {HttpErrorResponse} from '@angular/common/http';
import {DialogService} from '../dialog-service/dialog.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.less'
})
export class LoginPanelComponent implements OnInit, OnDestroy {
  private storageIdentifier: string = 'ARN_STORAGE_EMAIL';
  private errorSubscription: Subscription;
  error$: Observable<HttpErrorResponse> = this.store.select(selectError);
  loginInfo: Login = new Login('', '');
  rememberMe: boolean = false;
  errorMessage: string;

  constructor(private store: Store, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.initErrorHandling();
    this.loadSavedEmail();
  }

  onSubmit() {
    if (this.loginInfo.email && this.loginInfo.password) {
      if (!this.isValidEmail(this.loginInfo.email)) {
        this.errorMessage = 'Neplatný formát emailu';
        this.loginInfo.email = '';
        return;
      }
      if (this.rememberMe)
        localStorage.setItem(this.storageIdentifier, this.loginInfo.email);
      else
        localStorage.removeItem(this.storageIdentifier);
      this.store.dispatch(loginStart({ loginInfo: {...this.loginInfo }}));
    }
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  private loadSavedEmail() {
    const savedEmail = localStorage.getItem(this.storageIdentifier);
    this.loginInfo.email = savedEmail || '';
    this.rememberMe = !!savedEmail;
  }

  private initErrorHandling() {
    this.errorSubscription = this.error$.subscribe((error: HttpErrorResponse | null | undefined) => {
      if (error && typeof error.error === 'string') {
        this.errorMessage = error.error;
      } else if (error) {
        console.error(error);
        this.dialogService.openErrorDialog(error.message);
      }
    });
  }
}
