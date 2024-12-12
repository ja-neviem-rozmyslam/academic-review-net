import { Component, OnInit } from '@angular/core';
import { ProfilePageService } from './service/profile-page.service';
import {MENU_ITEMS} from '../home-page/enitites/MainMenu';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less']
})
export class ProfilePageComponent implements OnInit {
  userDetails: any;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private profilePageService: ProfilePageService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.profilePageService.getUserDetail().subscribe({
      next: (data) => {
        this.userDetails = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load user details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  protected readonly MENU_ITEMS = MENU_ITEMS;
}
