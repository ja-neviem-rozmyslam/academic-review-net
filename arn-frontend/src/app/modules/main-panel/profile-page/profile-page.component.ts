import { Component, OnInit } from '@angular/core';
import { ProfilePageService } from './service/profile-page.service';
import console from "node:console";
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less']
})
export class ProfilePageComponent implements OnInit {
  userDetails: any;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private profilePageService: ProfilePageService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  getSubmissionByConferenceId(conferenceId: number) {
    return this.userDetails.submission.find(submission => submission.conferenceId === conferenceId);
  }

  navigateToMyTheses() {
    this.router.navigate(['/main/my-theses']);
  }

  navigateToConferencePage(conferenceId: number) {
    this.router.navigate(['/main/conferences', conferenceId]);
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

    protected readonly console = console;
}
