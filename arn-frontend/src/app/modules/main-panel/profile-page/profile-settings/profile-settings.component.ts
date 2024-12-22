import { Component } from '@angular/core';
import {BaseModal} from '../../../components/base-modal/entities/BaseModal';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.less'
})
export class ProfileSettingsComponent extends BaseModal{

  protected readonly console = console;
}
