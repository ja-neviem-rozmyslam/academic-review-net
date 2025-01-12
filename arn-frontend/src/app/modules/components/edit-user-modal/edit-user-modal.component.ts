import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {BaseModal} from '../base-modal/entities/BaseModal';
import {UserDetails} from '../../main-panel/profile-page/profile-settings/entities/UserDetails';
import {EmailDomain} from '../registration-panel/entities/EmailDomain';
import {ProfileSettingsService} from '../../main-panel/profile-page/profile-settings/service/profile-settings.service';
import {EmailDomainService} from '../registration-panel/services/email-domain.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.less'
})
export class EditUserModalComponent extends BaseModal implements OnInit{

  @Output() profileUpdated = new EventEmitter<void>();

  userDetails: UserDetails;
  emailDomains: EmailDomain[];
  universitiesSelectOptions: any[];
  isFetching = true;

  constructor(@Inject('modalData') public data: any, private profileSettingsService: ProfileSettingsService, private emailDomainService: EmailDomainService) {
    super();

    this.userDetails = {
      email: data.user.email,
      name: data.user.name,
      surname: data.user.surname,
      universityId: data.user.university.id,
      role: data.user.role
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
      this.isFetching = false;
    });
  }

  updateEditProfile(): void {
    this.isFetching = true;
    this.profileSettingsService.updateEditProfile(this.userDetails).pipe().subscribe(() => {
      this.profileUpdated.emit();
      this.closeModal();
    });
  }

}
