import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {RoleService} from '../services/role.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private roleService: RoleService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          const targetRoute = this.roleService.isAdmin() ? '/administration' : '/main';
          this.router.navigate([targetRoute]);
          return false;
        }
        return true;
      })
    );
  }
}
