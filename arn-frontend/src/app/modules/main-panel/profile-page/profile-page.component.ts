import { Component, OnInit } from '@angular/core';
import { ProfilePageService } from './service/profile-page.service';
import {Router} from '@angular/router';
import {TABOPTIONS} from './entities/constants';
import {DialogService} from '../../services/dialog.service';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {UserPrettyNames} from '../../constants';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';


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
  showAlert = false;
  alertMessage = '';

  constructor(private profilePageService: ProfilePageService, private router: Router, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.fetchUserDetails().subscribe();
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

  fetchUserDetails(): Observable<any> {
    return this.profilePageService.getUserDetail().pipe(
      tap({
        next: (data) => {
          this.userDetails = data;
          this.isLoading = false;
          this.updateTabAvailability();
        },
        error: () => {
          this.error = 'Failed to load user details. Please try again later.';
          this.isLoading = false;
        }
      })
    );
  }

  openSettings(): void {
    const modalRef = this.dialogService.openCustomModal(ProfileSettingsComponent, {
      placement: 'center',
      backdrop: 'dynamic',
    }, this.userDetails);

    modalRef.instance.profileUpdated.subscribe(() => {
      this.fetchUserDetails().subscribe({
        complete: () => {
          this.alertMessage = 'Profil bol úspešne aktualizovaný.';
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        }
      });
    });

    modalRef.instance.passwordResetSent.subscribe(() => {
      this.fetchUserDetails().subscribe({
        complete: () => {
          this.alertMessage = 'E-mail na zmenu hesla bol odoslaný.';
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        }
      });
    });
  }

  protected readonly UserPrettyNames = UserPrettyNames;
}
