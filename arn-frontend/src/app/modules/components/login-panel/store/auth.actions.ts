import { createAction, props } from '@ngrx/store';
import {User} from '../../../objects/User';
import {Login} from '../enitites/Login';
import {HttpErrorResponse} from '@angular/common/http';

export const loginStart = createAction(
  '[Auth] Login',
  props<{ loginInfo: Login }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: HttpErrorResponse }>()
);
