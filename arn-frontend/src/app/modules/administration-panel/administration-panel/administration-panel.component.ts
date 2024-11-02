import { Component } from '@angular/core';
import {MENU_ITEMS} from '../../components/sidemenu/MenuItem';

@Component({
  selector: 'app-administration-panel',
  templateUrl: './administration-panel.component.html',
  styleUrl: './administration-panel.component.less'
})
export class AdministrationPanelComponent {
  myMenuItems = MENU_ITEMS;

}
