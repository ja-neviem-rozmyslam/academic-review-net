import { Component } from '@angular/core';
import {UniversityService} from '../../services/university.service';
import {MENU_ITEMS} from './enitites/MainMenu';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.less'
})
export class HomePageComponent {

  constructor() {
  }

  protected readonly MENU_ITEMS = MENU_ITEMS;
}
