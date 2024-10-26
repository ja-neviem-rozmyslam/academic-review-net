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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
