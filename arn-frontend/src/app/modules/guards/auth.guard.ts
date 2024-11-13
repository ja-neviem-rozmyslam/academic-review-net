import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserRoles } from '../constants';
import {RoleService} from '../services/role.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private roleService: RoleService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }

        const targetRoute = this.roleService.hasRole([UserRoles.ADMIN, UserRoles.SUPERADMIN])
          ? '/administration'
          : '/main';

        this.router.navigate([targetRoute]);

        return true;
      })
    );
  }
}
