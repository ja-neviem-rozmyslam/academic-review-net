import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import * as AuthReducer from './auth-store/auth.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  authState: AuthReducer.reducer
};
