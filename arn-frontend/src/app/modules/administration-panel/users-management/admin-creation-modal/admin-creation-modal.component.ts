import {Component, EventEmitter, Output} from '@angular/core';
import {BaseModal} from '../../../components/base-modal/entities/BaseModal';
import {ModalSettings} from '../../../components/base-modal/entities/ModalSettings';
import {UserDto} from '../entities/UserDto';
import {FormValidationErrors} from '../../../objects/FormValidationErrors';
import {UsersManagementService} from '../services/users-management.service';
import {HttpErrorResponse} from '@angular/common/http';
import {UtilityService} from '../../../services/utility.service';

@Component({
  selector: 'app-admin-creation-modal',
  templateUrl: './admin-creation-modal.component.html',
  styleUrl: './admin-creation-modal.component.less'
})
export class AdminCreationModalComponent extends BaseModal {
  @Output() adminCreated = new EventEmitter<void>();

  modalSettings: ModalSettings = {
    showHeader: true,
    title: 'Vytváranie administrátora',
  }

  errorMessage: string;
  formValidationErrors: FormValidationErrors;

  user: UserDto = new UserDto();

  constructor(private usersManagementService: UsersManagementService,
              private utilityService: UtilityService) {
    super();
  }

  onSubmit() {
    if (!this.formValidationErrors) {
      this.usersManagementService.createAdminUser(this.user).subscribe(
        () => {
          this.closeModal();
          this.adminCreated.emit();
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = this.utilityService.handleResponseError(error);
        }
      )
    }
  }
}
