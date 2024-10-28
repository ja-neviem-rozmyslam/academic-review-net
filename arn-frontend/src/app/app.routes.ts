import { Routes } from '@angular/router';
import {AdministrationPanelComponent} from './modules/administration-panel/administration-panel/administration-panel.component';
import {LoginPanelComponent} from './modules/components/login-panel/login-panel.component';
import {ForgotPasswordComponent} from './modules/components/forgot-password/forgot-password.component';
import {PasswordChangeComponent} from './modules/components/password-change/password-change.component';

export const routes: Routes = [
  { path: 'administration', component: AdministrationPanelComponent },
  { path: 'login', component: LoginPanelComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-change', component: PasswordChangeComponent },
];


