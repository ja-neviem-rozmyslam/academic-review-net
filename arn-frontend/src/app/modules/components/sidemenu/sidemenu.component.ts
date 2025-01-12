import { Component, Input } from '@angular/core';
import { MenuItem } from './MenuItem';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.less'
})
export class SidemenuComponent {
  @Input() menuItems: MenuItem[];
  dropdownState: Record<string, boolean> = {};

  constructor(private authService: AuthService, private router: Router) {}

  hasSubItems(item: MenuItem) {
    return item.subItems && item.subItems.length > 0;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleDropdown(path: string): void {
    Object.keys(this.dropdownState).forEach(key => {
      if (key !== path) {
        this.dropdownState[key] = false;
      }
    });

    this.dropdownState[path] = !this.dropdownState[path];
  }

  isDropdownOpen(path: string): boolean {
    return !!this.dropdownState[path];
  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }

  closeDropdown() {
    this.dropdownState = {};
  }
}
