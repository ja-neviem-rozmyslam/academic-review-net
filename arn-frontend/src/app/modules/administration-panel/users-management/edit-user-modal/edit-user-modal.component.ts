import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {BaseModal} from '../../../components/base-modal/entities/BaseModal';
import {UserDetails} from '../../../main-panel/profile-page/profile-settings/entities/UserDetails';
import {EmailDomain} from '../../../components/registration-panel/entities/EmailDomain';
import {EmailDomainService} from '../../../components/registration-panel/services/email-domain.service';
import {UsersManagementService} from '../services/users-management.service';

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

  constructor(@Inject('modalData') public data: any,private usersManagementService: UsersManagementService, private emailDomainService: EmailDomainService) {
    super();

    this.userDetails = {
      id:data.user.id,
      email: data.user.email,
      name: data.user.name,
      surname: data.user.surname,
      universityId: data.user.university.id,
      roles: data.user.roles
    };
  }

  ngOnInit() {
    //console.log(this.userDetails)
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

  updateUserProfile(): void {
    this.isFetching = true;
    this.usersManagementService.editUser(this.userDetails).pipe().subscribe(() => {
      this.profileUpdated.emit();
      this.closeModal();
    });
  }

}
