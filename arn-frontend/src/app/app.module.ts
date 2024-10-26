import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginPanelComponent} from './modules/components/login-panel/login-panel.component';
import {
  AdministrationPanelComponent
} from './modules/administration-panel/administration-panel/administration-panel.component';
import {SidemenuComponent} from './modules/components/sidemenu/sidemenu.component';
import {FormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {appReducer} from './modules/store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './modules/components/login-panel/store/auth-effects';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    AdministrationPanelComponent,
    SidemenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer, {}),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [AuthEffects],
  bootstrap: [AppComponent]
})
export class AppModule { }
