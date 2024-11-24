import { Routes } from '@angular/router';
import { AdministrationPanelComponent } from './modules/administration-panel/administration-panel/administration-panel.component';
import { LoginPanelComponent } from './modules/components/login-panel/login-panel.component';
import { ForgotPasswordComponent } from './modules/components/password-management/forgot-password/forgot-password.component';
import { PasswordChangeComponent } from './modules/components/password-management/password-change/password-change.component';
import { RegistrationPanelComponent } from './modules/components/registration-panel/registration-panel.component';
import { VerifyPageComponent } from './modules/components/verify-page/verify-page.component';
import { HomePageComponent } from './modules/main-panel/home-page/home-page.component';
import {AuthGuard} from './modules/guards/auth.guard';
import {RoleGuard} from './modules/guards/role.guard';
import {UserRoles} from './modules/constants';
import {LoginGuard} from './modules/guards/login.guard';
import {ConferencesListPageComponent} from './modules/main-panel/conference-page/conferences-list-page.component';
import {
  ConferenceJoinModalComponent
} from './modules/main-panel/conference-page/conference-card/conference-join-modal/conference-join-modal.component';
import {ConferencePageComponent} from './modules/main-panel/conference/conference-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPanelComponent, canActivate: [LoginGuard]},
  { path: 'registration', component: RegistrationPanelComponent, canActivate: [LoginGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-change', component: PasswordChangeComponent },
  { path: 'verification', component: VerifyPageComponent },

  { path: 'administration',
    component: AdministrationPanelComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRoles.SUPERADMIN, UserRoles.ADMIN] },
    children: []
  },
  {
    path: 'main',
    component: HomePageComponent,
    canActivate: [RoleGuard],
    data: {roles: [UserRoles.STUDENT, UserRoles.REVIEWER]},
    children: [
      {
        path: '',
        redirectTo: 'conferences',
        pathMatch: 'full'
      },
      {
        path: 'conferences',
        component: ConferencesListPageComponent
      },
      {
        path: 'conferences/:id',
        component: ConferencePageComponent
      }
    ]
  },

  { path: '', component: LoginPanelComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginPanelComponent, canActivate: [AuthGuard] }
];
