import {User} from '../../../objects/User';
import {HttpErrorResponse} from '@angular/common/http';

export interface AuthState {
  user: User | null;
  error?: HttpErrorResponse;
}
export const initialState: AuthState = {
  user: null,
};

