import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.less']
})
export class PasswordChangeComponent implements OnInit {
  password: string;
  secondPassword: string;
  passwordsNotMatch: boolean = false;
  errorMessage: string;
  passwordChangeToken: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.passwordChangeToken = this.route.snapshot.params['token'];
  }

  checkPasswordMatch(): boolean {
    const passwordsMatch = this.password === this.secondPassword;
    this.errorMessage = passwordsMatch ? '' : 'Heslá sa nezhodujú';
    this.passwordsNotMatch = !passwordsMatch;
    return passwordsMatch;
  }

  onSubmit(): void {
    if (this.password && this.secondPassword && this.checkPasswordMatch()) {
      console.log('Password changed: ', this.password);
    }
  }
}
