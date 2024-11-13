import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot) {

    const allowedRoles = next.data['roles'] as string[];

    if (this.authService.hasRole(allowedRoles)) {
      return true;
    } else {
      return false;
    }
  }
}
