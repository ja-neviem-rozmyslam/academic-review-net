import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PasswordChangeService} from '../service/password-change.service';
import {take, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {StatusMessages} from '../../../constants';
import {DialogService} from '../../../services/dialog.service';
import {PasswordChangedModalComponent} from '../password-changed-dialog/password-changed-modal.component';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.less',
  providers: [PasswordChangeService]
})
export class PasswordChangeComponent implements OnInit {
  private passwordChangeToken: string;
  tokenVerified: boolean = false;

  password: string;
  secondPassword: string;
  passwordsNotMatch: boolean = false;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private passwordChangeService: PasswordChangeService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      take(1), map(params => params['token']),
      tap(token => {
        if (!token) {
          this.router.navigate(['/']);
        } else {
          this.verifyToken(token);
        }
      })
    ).subscribe();
  }

  checkPasswordMatch(): boolean {
    const passwordsMatch = this.password === this.secondPassword;
    this.errorMessage = passwordsMatch ? '' : 'Heslá sa nezhodujú';
    this.passwordsNotMatch = !passwordsMatch;
    return passwordsMatch;
  }

  onSubmit(): void {
    if (this.password && this.secondPassword && this.checkPasswordMatch()) {
      this.passwordChangeService.passwordChange(this.passwordChangeToken, this.password).subscribe({
        next: () => {
          this.password = '';
          this.secondPassword = '';
          this.dialogService.openCustomModal(PasswordChangedModalComponent);
        },
        error: (error: HttpErrorResponse) => this.handleError(error)
      });
    }
  }

  private verifyToken(token: string): void {
    this.passwordChangeService.verifyToken(token).subscribe({
      next: () => {
        this.tokenVerified = true;
        this.passwordChangeToken = token;
      },
      error: () => this.router.navigate(['/'])
    });
  }

  private handleError(error: HttpErrorResponse): void {
    switch (error.error) {
      case StatusMessages.TOKEN_EXPIRED:
        this.dialogService.openErrorDialog('Platnosť tokenu vypršala. \n Požiadajte o nový reset hesla.');
        this.router.navigate(['/forgot-password']);
        break;
      case StatusMessages.TOKEN_NOT_FOUND:
        this.dialogService.openErrorDialog('Token nebol nájdený. \n Požiadajte o nový reset hesla.');
        break;
      default:
        this.dialogService.openErrorDialog(error.message);
        break;
    }
  }
}
