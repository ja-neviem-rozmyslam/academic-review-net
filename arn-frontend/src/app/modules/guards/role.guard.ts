import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {RoleService} from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const allowedRoles = next.data['roles'] as string[];

    return this.authService.isAuthenticated().pipe(
      take(1),
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
          this.authService.logout();
          return false;
        }

        if (this.roleService.hasRole(allowedRoles)) {
          return true;
        }

        if (this.roleService.isAdmin() && next.routeConfig?.path === 'main') {
          this.router.navigate(['/administration']);
        } else if (this.roleService.isUser() && next.routeConfig?.path === 'administration') {
          this.router.navigate(['/main']);
        } else {
          this.router.navigate(['/login']);
        }

        return false;
      })
    );
  }
}
