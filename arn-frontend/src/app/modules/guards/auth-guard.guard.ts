import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { selectUser } from '../store/auth-store/auth.selector';
import { User } from '../objects/User';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(_:any, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map((user: User | null) => {
        const isLoggedIn = !!user;

        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }

        if (state.url === '/' || state.url === '/**') {
          this.router.navigate(['/main']);
          return false;
        }

        return true;
      })
    );
  }
}
