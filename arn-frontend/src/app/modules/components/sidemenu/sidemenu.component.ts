import {Component, Input} from '@angular/core';
import {MenuItem} from './MenuItem';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.less'
})
export class SidemenuComponent {
  @Input() menuItems: MenuItem[];

  hasSubItems(item: MenuItem) {
    return item.subItems && item.subItems.length > 0;
  }
}
