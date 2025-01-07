import {Component, OnInit} from '@angular/core';
import {TABOPTIONS} from './entities/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {ConferenceService} from '../conference-page/service/conference.service';
import {DialogService} from '../../services/dialog.service';
import {ConferenceDetail} from './entities/ConferenceDetail';
import {RoleService} from '../../services/role.service';
import {UserRoles} from '../../constants';
import {ConferenceStore} from '../conference-page/store/conferences-store.service';

@Component({
  selector: 'app-thesis-page',
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.less'
})
export class ConferencePageComponent implements OnInit {
  tabOptions = TABOPTIONS;
  selectedOption = TABOPTIONS[0].value;

  thesisCategories$ = this.conferenceStore.thesisCategories$;
  conferenceDetail: ConferenceDetail;
  isConferenceLoaded = false;

  roleInConference: string;

  submissionOptions = {
    isUploaded: false,
    isBeforeDeadline: false,
  };
  reviewOptions = {
    isReviewed: false,
    isBeforeDeadline: false,
  }

  infoTabContent: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private roleService: RoleService,
    private conferenceStore: ConferenceStore,
    private conferenceService: ConferenceService) {
  }

  ngOnInit(): void {
    const conferenceId = this.route.snapshot.params['id'];
    const submissionId = this.route.snapshot.params['submissionId'];
    if (!conferenceId) {
      this.redirectToHome();
      return;
    }
    this.loadConferenceData(conferenceId, submissionId);
  }

  getInfoTabContent(dateTime: string, prefix: string): string {
    if (dateTime === null) {
      return null;
    }

    const timeDifference = new Date(dateTime).getTime() - new Date().getTime();
    if (timeDifference < 0) {
      return null;
    }

    const minutes = Math.floor(timeDifference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${prefix} ${days} dní`;
    } else if (hours > 0) {
      return `${prefix} ${hours} hodín`;
    } else if (minutes > 0) {
      return `${prefix} ${minutes} minút`;
    } else {
      return `${prefix} < 1 minúta`;
    }
  }


  private loadConferenceData(conferenceId: number, submissionId?: number): void {
    this.conferenceService.getConferenceData(conferenceId, submissionId).subscribe({
      next: (conferenceDetail: ConferenceDetail) => {
        this.conferenceDetail = conferenceDetail;
        this.isConferenceLoaded = conferenceDetail.id !== undefined;
        this.handleRoleBasedView();
      },
      error: (error) => {
        this.redirectToHome();
        this.dialogService.openErrorDialog(`Problém s načítaním konferencie: ${error.error}`);
      }
    });
  }

  private handleRoleBasedView(): void {
    const isUploaded = this.conferenceDetail.submission !== null;
    const isReviewed = this.conferenceDetail.review !== null;
    if (this.roleService.isStudent() && this.conferenceDetail.submissionRole === UserRoles.STUDENT) {
      this.roleInConference = UserRoles.STUDENT;
      this.submissionOptions.isUploaded = isUploaded;
      this.submissionOptions.isBeforeDeadline = new Date() < new Date(this.conferenceDetail.uploadDeadline);
      this.infoTabContent = this.getInfoTabContent(this.conferenceDetail.uploadDeadline, 'Na odovzdanie práce zostáva');

      this.reviewOptions.isReviewed = isReviewed;
      this.reviewOptions.isBeforeDeadline = new Date() < new Date(this.conferenceDetail.reviewDeadline);

    } else if (this.roleService.isReviewer() && this.conferenceDetail.submissionRole === UserRoles.REVIEWER) {
      this.roleInConference = UserRoles.REVIEWER;
      this.submissionOptions.isUploaded = isUploaded;
      this.infoTabContent = this.getInfoTabContent(this.conferenceDetail.reviewDeadline, 'Na napísanie posudku zostáva');

      this.reviewOptions.isReviewed = isReviewed;
      this.reviewOptions.isBeforeDeadline = new Date() < new Date(this.conferenceDetail.reviewDeadline);
    } else {
      if (this.roleService.isReviewer()) {
        this.dialogService.openInfoDialog('Informácia', 'Nebola vám pridelená žiadna záverečná práca na posúdenie.');
      }
      this.redirectToHome();
    }
  }

  private redirectToHome(): void {
    this.router.navigate(['/']);
  }
}
