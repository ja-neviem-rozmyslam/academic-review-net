import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DialogService} from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private dialogService: DialogService) {
  }

  handleResponseError(error: HttpErrorResponse): string {
    if (typeof error?.error === 'string') {
      return error.error;
    } else if (error?.status === 500) {
      this.dialogService.openErrorDialog('Nastala chyba pri komunikácii so serverom');
    } else if (error) {
      this.dialogService.openErrorDialog(error.message);
    }
    return null;
  }
}
