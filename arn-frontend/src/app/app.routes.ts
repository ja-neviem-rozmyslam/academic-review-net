import { Routes } from '@angular/router';
import { AdministrationPageComponent } from './modules/administration-panel/administration-panel/administration-page.component';
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
import {ConferencePageComponent} from './modules/main-panel/conference/conference-page.component';
import {ProfilePageComponent} from './modules/main-panel/profile-page/profile-page.component';
import {MyThesesComponent} from './modules/main-panel/my-theses/my-theses.component';
import {
  ConferencesManagementComponent
} from './modules/administration-panel/conferences-management/conferences-management.component';
import {UsersManagementComponent} from './modules/administration-panel/users-management/users-management.component';
import {ConferenceEditComponent} from './modules/administration-panel/conferences-management/conference-edit/conference-edit.component'

export const routes: Routes = [
  { path: 'login', component: LoginPanelComponent, canActivate: [LoginGuard]},
  { path: 'login/admin', component: LoginPanelComponent, canActivate: [LoginGuard], data: { isAdminLogin: true } },
  { path: 'registration', component: RegistrationPanelComponent, canActivate: [LoginGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-change', component: PasswordChangeComponent },
  { path: 'verification', component: VerifyPageComponent },

  { path: 'administration',
    component: AdministrationPageComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRoles.SUPERADMIN, UserRoles.ADMIN] },
    children: [
      {
        path: '',
        redirectTo: 'conference-management',
        pathMatch: 'full'
      },
      {
        path: 'conference-management',
        component: ConferencesManagementComponent,
      },
      {
        path: 'users-management',
        component: UsersManagementComponent
      },
      {
        path: 'conference/:conferenceID',
        component: ConferenceEditComponent
      }
    ]
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
      },
      {
        path: 'my-theses',
        component: MyThesesComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent
      }
    ]
  },

  { path: '', component: LoginPanelComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginPanelComponent, canActivate: [AuthGuard] }
];
