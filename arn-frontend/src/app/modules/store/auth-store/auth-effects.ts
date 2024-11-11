import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of, switchMap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import * as AuthAction from './auth.actions';
import {AuthService} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private loginService: AuthService, private router: Router) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.loginStart),
      switchMap((action) =>
        this.loginService.login(action.loginInfo).pipe(
          map(user => AuthAction.loginSuccess({ user })),
          catchError((error: HttpErrorResponse) => {
            return of(AuthAction.loginFailure({ error }))
          }
        )
      )
    )
  ));

  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthAction.loginSuccess),
        map(() => {
          this.router.navigate(['/']);
        })
      ),
    {dispatch: false}
  );
}
