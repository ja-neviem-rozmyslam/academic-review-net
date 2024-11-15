import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {RoleService} from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private roleService: RoleService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const allowedRoles = next.data['roles'] as string[];

    if (this.roleService.hasRole(allowedRoles)) {
      return true;
    }

    if (this.roleService.isAdmin()
      && next.routeConfig?.path === 'main') {
      this.router.navigate(['/administration']);
    } else if (this.roleService.isUser()
      && next.routeConfig?.path === 'administration') {
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
}
