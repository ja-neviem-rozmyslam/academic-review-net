import {Component, OnInit} from '@angular/core';
import {RoleService} from '../../services/role.service';
import {MenuItem} from '../../components/sidemenu/MenuItem';
import {getMenuItems} from './enitites/MainMenu';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.less'
})
export class HomePageComponent implements OnInit {

  menuItems: MenuItem[];

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    const userRoles = this.roleService.getRoles();
    this.menuItems = getMenuItems(userRoles);
  }
}
