import {Component, OnInit} from '@angular/core';
import {Registration} from './entities/Registration';
import {SelectOption} from '../arn-select/entities/SelectOption';
import {EmailDomain} from './entities/EmailDomain';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-registration-panel',
  templateUrl: './registration-panel.component.html',
  styleUrl: './registration-panel.component.less'
})
export class RegistrationPanelComponent implements OnInit {
  formValidationErrors: { emptyFields: string[], invalidEmails: string[] };
  registrationInfo: Registration = new Registration();
  universities: SelectOption[];
  emailDomains: EmailDomain[];
  errorMessage: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.universities = [
      {value: 1, display: 'Univerzita Konštantína Filozofa v Nitre'},
      {value: 2, display: 'Univerzita Komenského v Bratislave'},
      {value: 3, display: 'Technická univerzita v Košiciach'}
    ];
    this.emailDomains = [
      {domain: 'ukf.sk', universityId: 1},
      {domain: 'uniba.sk', universityId: 2},
      {domain: 'tuke.sk', universityId: 3}
    ];
  }

  findRelevantUniversity() {
    const domain = this.registrationInfo.email.split('@')[1] || '';
    const matchingDomain = this.emailDomains.find(emailDomain => domain.includes(emailDomain.domain));

    if (matchingDomain) {
      this.registrationInfo.universityId = matchingDomain.universityId;
    }
  }

  onSubmit() {
    if(this.formValidationErrors) {
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
        },
        () => {
          this.errorMessage = 'Registrácia zlyhala';
        }
      );
    }
  }
}
