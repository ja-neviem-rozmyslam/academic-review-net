import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import * as AuthReducer from '../components/login-panel/store/auth.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  authState: AuthReducer.reducer
};
