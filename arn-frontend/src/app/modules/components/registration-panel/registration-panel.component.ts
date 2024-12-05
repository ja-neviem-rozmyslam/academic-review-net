import {Component, OnInit} from '@angular/core';
import {Registration} from './entities/Registration';
import {EmailDomain} from './entities/EmailDomain';
import {AuthService} from '../../services/auth.service';
import {NavigationExtras, Router} from '@angular/router';
import {SelectOption} from '../arn-select/entities/SelectOption';
import {EmailDomainService} from './services/email-domain.service';
import {HttpErrorResponse} from '@angular/common/http';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-registration-panel',
  templateUrl: './registration-panel.component.html',
  styleUrl: './registration-panel.component.less',
  providers: [EmailDomainService]
})
export class RegistrationPanelComponent implements OnInit {
  formValidationErrors: { emptyFields: string[], invalidEmails: string[] };
  registrationInfo: Registration = new Registration();
  emailDomains: EmailDomain[];
  universitiesSelectOptions: SelectOption[];
  errorMessage: string;

  constructor(private authService: AuthService, private utilityService: UtilityService,
              private router: Router, private emailDomainService: EmailDomainService) {
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

  findRelevantUniversity() {
    const domain = this.registrationInfo.email.split('@')[1] || '';
    const matchingUniversity = this.universitiesSelectOptions.find(option => domain.includes(option.selectObject.domain));

    if (matchingUniversity) {
      this.registrationInfo.universityId = Number(matchingUniversity.value);
    }
  }

  onSubmit() {
    if (this.formValidationErrors) {
      if (this.formValidationErrors.emptyFields.length > 0) {
        this.errorMessage = 'Všetky polia musia byť vyplnené';
        return;
      }
      if (this.formValidationErrors.invalidEmails.length > 0) {
        this.errorMessage = 'Neplatný formát emailu';
        this.registrationInfo.email = '';
        return;
      }
    } else {
      this.authService.registration(this.registrationInfo).subscribe(
        () => {
          this.errorMessage = null;
          this.registrationInfo = new Registration();
          this.router.navigate(['/login'], {
            state: {
              status: 'success',
              message: 'Registrácia prebehla úspešne, skontrolujte si email pre overenie účtu'
            }
          } as NavigationExtras);
        },
        (error: HttpErrorResponse) => {
          this.utilityService.handleResponseError(error);
        }
      );
    }
  }
}
