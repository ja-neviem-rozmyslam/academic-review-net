import { Component, OnInit } from '@angular/core';
import { ProfilePageService } from './service/profile-page.service';
import {Router} from '@angular/router';
import {TABOPTIONS} from './entities/constants';
import {DialogService} from '../../services/dialog.service';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {UserPrettyNames} from '../../constants';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less']
})
export class ProfilePageComponent implements OnInit {
  tabOptions = TABOPTIONS;
  selectedOption = TABOPTIONS[0].value;
  userDetails: any;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private profilePageService: ProfilePageService, private router: Router, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  updateTabAvailability() {
    const roles = this.userDetails.user.roles;

    const isStudent = roles.includes('S');
    this.tabOptions.find(tab => tab.value === 'SUBMISSIONS').disabled = !isStudent;

    const isReviewer = roles.includes('R');
    this.tabOptions.find(tab => tab.value === 'REVIEWS').disabled = !isReviewer;
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
        this.updateTabAvailability();
      },
      error: () => {
        this.error = 'Failed to load user details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  openSettings(): void {
    this.dialogService.openCustomModal(ProfileSettingsComponent, {
      placement: 'center',
      backdrop: 'dynamic',
    }, this.userDetails);
  }

  protected readonly UserPrettyNames = UserPrettyNames;
}
