import {Injectable} from '@angular/core';
import {UserRoles} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly rolesKey = 'arn-auth-roles';

  storeRoles(roles: string[]): void {
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
  }

  getRoles(): string[] | null {
    const roles = localStorage.getItem(this.rolesKey);
    return roles ? JSON.parse(roles) : null;
  }

  hasRole(role: string | string[]): boolean {
    const roles = this.getRoles();
    if (!roles) return false;

    if (Array.isArray(role)) {
      return role.some(r => roles.includes(r));
    }
    return roles.includes(role);
  }

  isSuperAdmin(): boolean {
    return this.hasRole(UserRoles.SUPERADMIN);
  }

  isAdmin(): boolean {
    return this.hasRole([UserRoles.ADMIN, UserRoles.SUPERADMIN]);
  }

  isUser(): boolean {
    return this.hasRole([UserRoles.STUDENT, UserRoles.REVIEWER]);
  }

  isStudent(): boolean {
    return this.hasRole([UserRoles.STUDENT]);
  }

  isReviewer(): boolean {
    return this.hasRole([UserRoles.REVIEWER]);
  }

  clearRoles(): void {
    localStorage.removeItem(this.rolesKey);
  }

}
