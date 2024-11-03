import { Component } from '@angular/core';
import {Registration} from './entities/Registration';

@Component({
  selector: 'app-registration-panel',
  templateUrl: './registration-panel.component.html',
  styleUrl: './registration-panel.component.less'
})
export class RegistrationPanelComponent {
  registrationInfo: Registration = new Registration();
  errorMessage: string;

  onSubmit() {
    console.log('Registration info:', this.registrationInfo);
  }
}
