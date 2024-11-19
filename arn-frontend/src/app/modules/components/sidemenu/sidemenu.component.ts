import {Component, Input} from '@angular/core';
import {MenuItem} from './MenuItem';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.less'
})
export class SidemenuComponent {
  @Input() menuItems: MenuItem[];

  constructor(private authService: AuthService, private router: Router) {
  }

  hasSubItems(item: MenuItem) {
    return item.subItems && item.subItems.length > 0;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
