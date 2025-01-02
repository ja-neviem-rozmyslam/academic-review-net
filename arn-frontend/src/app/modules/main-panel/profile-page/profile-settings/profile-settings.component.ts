import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {BaseModal} from '../../../components/base-modal/entities/BaseModal';
import {ProfileSettingsService} from './service/profile-settings.service';
import {EmailDomain} from '../../../components/registration-panel/entities/EmailDomain';
import {EmailDomainService} from '../../../components/registration-panel/services/email-domain.service';
import {UserDetails} from './entities/UserDetails';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.less'
})
export class ProfileSettingsComponent extends BaseModal implements OnInit {

  @Output() profileUpdated = new EventEmitter<void>();

  userDetails: UserDetails;
  emailDomains: EmailDomain[];
  universitiesSelectOptions: any[];

  constructor(@Inject('modalData') public data: any, private profileSettingsService: ProfileSettingsService, private emailDomainService: EmailDomainService) {
    super();

    this.userDetails = {
      email: data.user.email,
      name: data.user.name,
      surname: data.user.surname,
      universityId: data.user.university.id
    };
  }

  ngOnInit() {
    this.emailDomainService.getAllDomains().pipe().subscribe((domains: EmailDomain[]) => {
      this.emailDomains = domains;
      this.universitiesSelectOptions = this.emailDomains.map(university => ({
        value: university.universityId,
        display: university.universityName,
        selectObject: university
      }));
    });
  }

  updateProfile(): void {
    //console.log(this.userDetails);
    this.profileSettingsService.updateProfile(this.userDetails).pipe().subscribe(() => {
      this.profileUpdated.emit();
      this.closeModal();
    });
  }

  sendPasswordReset(): void {
    this.profileSettingsService.sendPasswordReset(this.userDetails.email).pipe().subscribe(() => {
      this.closeModal();
    });
  }
}
