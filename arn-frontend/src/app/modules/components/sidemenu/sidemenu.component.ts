import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from './MenuItem';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.less'
})
export class SidemenuComponent implements OnInit, OnDestroy {
  @Input() menuItems: MenuItem[];
  dropdownState: Record<string, boolean> = {};
  unreadNotificationsCount = this.notificationService.unreadNotificationsCount;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.notificationService.loadNotifications();
    setTimeout(() => {
      this.notificationService.connectToWebSocket();
    }, 500);
  }

  ngOnDestroy(): void {
    this.notificationService.closeWebSocket();
  }

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
