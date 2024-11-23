import {Component, OnInit} from '@angular/core';
import {Registration} from './entities/Registration';
import {EmailDomain} from './entities/EmailDomain';
import {AuthService} from '../../services/auth.service';
import {NavigationExtras, Router} from '@angular/router';
import {SelectOption} from '../arn-select/entities/SelectOption';

@Component({
  selector: 'app-registration-panel',
  templateUrl: './registration-panel.component.html',
  styleUrl: './registration-panel.component.less'
})
export class RegistrationPanelComponent implements OnInit {
  formValidationErrors: { emptyFields: string[], invalidEmails: string[] };
  registrationInfo: Registration = new Registration();
  emailDomains: EmailDomain[];
  universitiesSelectOptions: SelectOption[];
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.emailDomains = [
      {universityId: 1, universityName: 'Univerzita Konštantína Filozofa v Nitre', domain: 'ukf.sk'},
      {universityId: 2, universityName: 'Univerzita Komenského v Bratislave', domain: 'uniba.sk'},
      {universityId: 3, universityName: 'Technická univerzita v Košiciach', domain: 'tuke.sk'}
    ];
    this.universitiesSelectOptions = this.emailDomains.map(university => ({
      value: university.universityId,
      display: university.universityName,
      selectObject: university
    }));
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
        (error: any) => {
          console.log(error);
          if (error && typeof error.error === 'string') {
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'Nastala chyba pri registrácii';
          }
        }
      );
    }
  }
}
