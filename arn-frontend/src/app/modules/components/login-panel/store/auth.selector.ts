import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('authState');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
