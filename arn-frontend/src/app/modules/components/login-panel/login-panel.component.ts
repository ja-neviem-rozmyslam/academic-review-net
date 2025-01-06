import {Component, OnDestroy, OnInit} from '@angular/core';
import {Login} from './enitites/Login';
import {Store} from '@ngrx/store';
import {loginStart, resetError} from '../../store/auth-store/auth.actions';
import {Observable, Subscription} from 'rxjs';
import {selectError} from '../../store/auth-store/auth.selector';
import {HttpErrorResponse} from '@angular/common/http';
import {UtilityService} from '../../services/utility.service';
import {FormValidationErrors} from '../../objects/FormValidationErrors';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.less'
})
export class LoginPanelComponent implements OnInit, OnDestroy {
  private storageIdentifier: string = 'arn-remembered-email';
  private errorSubscription: Subscription;
  formValidationErrors: FormValidationErrors;
  error$: Observable<HttpErrorResponse> = this.store.select(selectError);
  loginInfo: Login = new Login('', '');
  rememberMe: boolean = false;
  errorMessage: string;

  isAdminLogin: boolean = false;

  showAlert: boolean = false;
  verificationStatus: boolean;
  verificationMessage: string;

  constructor(private store: Store,
              private utilityService: UtilityService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isAdminLogin = !!this.route.snapshot.data['isAdminLogin'];
    this.initErrorHandling();
    if (!this.isAdminLogin) {
      const state = history.state as { status?: string, message?: string };
      if (state.status && state.message) {
        this.showAlert = true;
        this.verificationStatus = state.status === 'success';
        this.verificationMessage = state.message;
        history.replaceState({}, '');
      }
      this.loadSavedEmail();
    }
  }

  onSubmit() {
    if (this.formValidationErrors) {
      if (this.formValidationErrors.emptyFields?.length > 0) {
        this.errorMessage = 'Všetky polia musia byť vyplnené';
        return;
      }
      if (this.formValidationErrors.invalidEmails?.length > 0) {
        this.errorMessage = 'Neplatný formát emailu';
        this.loginInfo.email = '';
        return;
      }
    } else {
      if (this.rememberMe)
        localStorage.setItem(this.storageIdentifier, this.loginInfo.email);
      else
        localStorage.removeItem(this.storageIdentifier);
      this.store.dispatch(loginStart({ loginInfo: { ...this.loginInfo }, isAdminLogin: this.isAdminLogin }));
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
      if(error) {
        this.errorMessage = this.utilityService.handleResponseError(error);
        this.store.dispatch(resetError());
      }
    });
  }
}
