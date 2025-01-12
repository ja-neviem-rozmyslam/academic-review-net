import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {BaseModal} from '../../../components/base-modal/entities/BaseModal';
import {UserDetails} from '../../../main-panel/profile-page/profile-settings/entities/UserDetails';
import {EmailDomain} from '../../../components/registration-panel/entities/EmailDomain';
import {EmailDomainService} from '../../../components/registration-panel/services/email-domain.service';
import {UsersManagementService} from '../services/users-management.service';
import {UserRoles} from '../../../constants';
import {FormValidationErrors} from '../../../objects/FormValidationErrors';

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

  formValidationErrors: FormValidationErrors;

  constructor(@Inject('modalData') public data: any,private usersManagementService: UsersManagementService, private emailDomainService: EmailDomainService) {
    super();

    this.userDetails = {
      id: data.id,
      email: data.email,
      name: data.name,
      surname: data.surname,
      universityId: data.university.id,
      roles: data.roles
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

  updateUserProfile(): void {
    if (!this.formValidationErrors && this.userDetails.roles.length > 0) {
      this.isFetching = true;
      this.usersManagementService.editUser(this.userDetails).pipe().subscribe(() => {
        this.profileUpdated.emit();
        this.closeModal();
      });
    }
  }


  onRoleChange(checkboxEvent: any, selectedRole: string): void {
    if (checkboxEvent.currentTarget.checked) {
      if (!this.userDetails.roles.includes(selectedRole)) {
        this.userDetails.roles.push(selectedRole);
      }
    } else {
      this.userDetails.roles = this.userDetails.roles.filter(role => role !== selectedRole);
    }
  }

  protected readonly UserRoles = UserRoles;
}
