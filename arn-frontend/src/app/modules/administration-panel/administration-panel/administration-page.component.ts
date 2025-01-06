import { Component } from '@angular/core';
import { AdminMenu } from './entities/AdminMenu';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrl: './administration-page.component.less'
})
export class AdministrationPageComponent {

  menuItems = AdminMenu;

}
