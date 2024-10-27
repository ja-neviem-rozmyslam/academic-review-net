import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPanelComponent} from './modules/components/login-panel/login-panel.component';
import {
  AdministrationPanelComponent
} from './modules/administration-panel/administration-panel/administration-panel.component';
import {SidemenuComponent} from './modules/components/sidemenu/sidemenu.component';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './modules/store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './modules/components/login-panel/store/auth-effects';
import {provideHttpClient} from '@angular/common/http';
import {
  DialogComponent
} from './modules/components/dialog-service/dialog-component/dialog.component';
import { ArnButtonComponent } from './modules/components/arn-button/arn-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    AdministrationPanelComponent,
    SidemenuComponent,
    DialogComponent,
    ArnButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(appReducer, {}),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [provideHttpClient(), AuthEffects],
  bootstrap: [AppComponent]
})
export class AppModule {
}
