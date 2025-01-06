import {Action, createReducer, on} from '@ngrx/store';
import {AuthState, initialState} from './auth.state';
import * as AuthActions from './auth.actions';

const authReducer = createReducer(
  initialState,
  on(
    AuthActions.loginStart, (state): AuthState => ({
      ...state
    })),
  on(
    AuthActions.loginSuccess, (state, {user}): AuthState => ({
      ...state,
      user: user,
    })),
  on(
    AuthActions.loginFailure, (state, {error}): AuthState => ({
      ...state,
      error: error
    })),
  on(
    AuthActions.resetError, (state): AuthState => ({
      ...state,
      error: null
    }))
);


export const reducer = (state: AuthState | undefined, action: Action) => authReducer(state, action);
