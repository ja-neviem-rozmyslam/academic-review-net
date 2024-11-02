import { Routes } from '@angular/router';
import {AdministrationPanelComponent} from './modules/administration-panel/administration-panel/administration-panel.component';
import {LoginPanelComponent} from './modules/components/login-panel/login-panel.component';
import {ForgotPasswordComponent} from './modules/components/password-management/forgot-password/forgot-password.component';
import {PasswordChangeComponent} from './modules/components/password-management/password-change/password-change.component';

export const routes: Routes = [
  { path: 'administration', component: AdministrationPanelComponent },
  { path: 'login', component: LoginPanelComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-change', component: PasswordChangeComponent },
];


