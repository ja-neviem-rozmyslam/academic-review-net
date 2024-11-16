import {Injectable} from '@angular/core';
import {RoleService} from './role.service';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly tokenKey = 'arn-auth-token';
  private readonly refreshTokenKey = 'arn-refresh-token';

  constructor(private roleService: RoleService) {
  }

  storeToken(token: string): void {
    const authToken = this.getDecodedAccessToken(token);
    localStorage.setItem(this.tokenKey, token);
    if (authToken && authToken.roles) {
      this.roleService.storeRoles(authToken.roles);
    }
  }

  storeRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  clearStorage(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.roleService.clearRoles();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  getTokenExpirationDate(token: string): Date | null {
    const decodedToken = this.getDecodedAccessToken(token);
    if (decodedToken && decodedToken.exp) {
      const expiration = decodedToken.exp * 1000;
      return new Date(expiration);
    }
    return null;
  }

  isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    if (!expirationDate) {
      return true;
    }
    return expirationDate.getTime() < Date.now();
  }
}
