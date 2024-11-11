import { Routes } from '@angular/router';
import {AdministrationPanelComponent} from './modules/administration-panel/administration-panel/administration-panel.component';
import {LoginPanelComponent} from './modules/components/login-panel/login-panel.component';
import {ForgotPasswordComponent} from './modules/components/password-management/forgot-password/forgot-password.component';
import {PasswordChangeComponent} from './modules/components/password-management/password-change/password-change.component';
import {RegistrationPanelComponent} from './modules/components/registration-panel/registration-panel.component';
import {VerifyPageComponent} from './modules/components/verify-page/verify-page.component';
import {HomePageComponent} from './modules/main-panel/home-page/home-page.component';
import { AuthGuard } from './modules/guards/auth-guard.guard';

export const routes: Routes = [
  { path: 'login', component: LoginPanelComponent },
  { path: 'registration', component: RegistrationPanelComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-change', component: PasswordChangeComponent },
  { path: 'verification', component: VerifyPageComponent },
  { path: 'administration', component: AdministrationPanelComponent, canActivate: [AuthGuard] },
  { path: 'main', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main' }
];


