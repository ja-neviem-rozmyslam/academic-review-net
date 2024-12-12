import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPanelComponent } from './modules/components/login-panel/login-panel.component';
import { AdministrationPanelComponent } from './modules/administration-panel/administration-panel/administration-panel.component';
import { SidemenuComponent } from './modules/components/sidemenu/sidemenu.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './modules/store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './modules/store/auth-store/auth-effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogComponent } from './modules/components/dialog-component/dialog.component';
import { ArnButtonComponent } from './modules/components/arn-button/arn-button.component';
import { DialogService } from './modules/services/dialog.service';
import { PasswordChangeComponent } from './modules/components/password-management/password-change/password-change.component';
import { ForgotPasswordComponent } from './modules/components/password-management/forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormValidationDirective } from './modules/directives/FormValidationDirective';
import { PasswordChangedModalComponent } from './modules/components/password-management/password-changed-dialog/password-changed-modal.component';
import { BaseModalComponent } from './modules/components/base-modal/base-modal.component';
import { RegistrationPanelComponent } from './modules/components/registration-panel/registration-panel.component';
import { ArnSelectComponent } from './modules/components/arn-select/arn-select.component';
import { VerifyPageComponent } from './modules/components/verify-page/verify-page.component';
import { ArnToastComponent } from './modules/components/arn-toast/arn-toast.component';
import { HomePageComponent } from './modules/main-panel/home-page/home-page.component';
import { AuthInterceptor } from './modules/services/AuthInterceptor';
import {NgHeroiconsModule} from '@dimaslz/ng-heroicons';
import { ConferencesListPageComponent } from './modules/main-panel/conference-page/conferences-list-page.component';
import { ConferenceCardComponent } from './modules/main-panel/conference-page/conference-card/conference-card.component';
import { ConferencePageComponent } from './modules/main-panel/conference/conference-page.component';
import {
  ConferenceJoinModalComponent
} from './modules/main-panel/conference-page/conference-card/conference-join-modal/conference-join-modal.component';
import { TabsComponent } from './modules/components/tabs/tabs.component';
import { SubmissionComponent } from './modules/main-panel/conference/submission/submission.component';
import { ReviewComponent } from './modules/main-panel/conference/review/review.component';
import { ArnFileinputComponent } from './modules/components/arn-fileinput/arn-fileinput.component';
import {ConferenceStore} from './modules/main-panel/conference-page/store/conferences-store.service';
import { ProfilePageComponent } from './modules/main-panel/profile-page/profile-page.component';
import { PaginationComponent } from './modules/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    AdministrationPanelComponent,
    SidemenuComponent,
    DialogComponent,
    ArnButtonComponent,
    PasswordChangeComponent,
    ForgotPasswordComponent,
    FormValidationDirective,
    PasswordChangedModalComponent,
    BaseModalComponent,
    RegistrationPanelComponent,
    ArnSelectComponent,
    VerifyPageComponent,
    ArnToastComponent,
    HomePageComponent,
    ConferencesListPageComponent,
    ConferenceCardComponent,
    ConferencePageComponent,
    ConferenceJoinModalComponent,
    TabsComponent,
    SubmissionComponent,
    ReviewComponent,
    ArnFileinputComponent,
    ProfilePageComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgHeroiconsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(appReducer, {}),
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthEffects,
    DialogService,
    ConferenceStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
