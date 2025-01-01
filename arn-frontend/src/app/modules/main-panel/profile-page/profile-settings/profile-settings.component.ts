import {Component, Inject} from '@angular/core';
import {BaseModal} from '../../../components/base-modal/entities/BaseModal';
import {ProfileSettingsService} from './service/profile-settings.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.less'
})

export class ProfileSettingsComponent extends BaseModal{
  userDetails: any;
  constructor(@Inject('modalData') public data: any, private profileSettingsService: ProfileSettingsService) {
    super();
    this.userDetails = data;
  }
  sendPasswordReset(): void {
    this.profileSettingsService.sendPasswordReset(this.userDetails.user.email);
  }
}
