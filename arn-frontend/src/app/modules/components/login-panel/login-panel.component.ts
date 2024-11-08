import {Component, OnDestroy, OnInit} from '@angular/core';
import {Login} from './enitites/Login';
import {Store} from '@ngrx/store';
import {loginStart} from '../../store/auth-store/auth.actions';
import {Observable, Subscription, take} from 'rxjs';
import {selectError} from '../../store/auth-store/auth.selector';
import {HttpErrorResponse} from '@angular/common/http';
import {DialogService} from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.less'
})
export class LoginPanelComponent implements OnInit, OnDestroy {
  private storageIdentifier: string = 'ARN_STORAGE_EMAIL';
  private errorSubscription: Subscription;
  formValidationErrors: { emptyFields: string[], invalidEmails: string[] };
  error$: Observable<HttpErrorResponse> = this.store.select(selectError);
  loginInfo: Login = new Login('', '');
  rememberMe: boolean = false;
  errorMessage: string;

  verificationStatus: boolean;
  verificationMessage: string;

  constructor(private store: Store, private dialogService: DialogService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      if (params.has('status') && params.has('message')) {
        this.verificationStatus = params.get('status') === 'success';
        this.verificationMessage = params.get('message');
      }
    });
    this.initErrorHandling();
    this.loadSavedEmail();
  }

  onSubmit() {
    if (this.formValidationErrors) {
      if (this.formValidationErrors.emptyFields.length > 0) {
        this.errorMessage = 'Všetky polia musia byť vyplnené';
        return;
      }
      if (this.formValidationErrors.invalidEmails.length > 0) {
        this.errorMessage = 'Neplatný formát emailu';
        this.loginInfo.email = '';
        return;
      }
    } else {
      if (this.rememberMe)
        localStorage.setItem(this.storageIdentifier, this.loginInfo.email);
      else
        localStorage.removeItem(this.storageIdentifier);
      this.store.dispatch(loginStart({loginInfo: {...this.loginInfo}}));
    }
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
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
