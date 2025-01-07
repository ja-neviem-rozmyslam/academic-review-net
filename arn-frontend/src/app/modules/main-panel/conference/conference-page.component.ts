import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TABOPTIONS } from './entities/constants';
import { ConferenceService } from '../conference-page/service/conference.service';
import { DialogService } from '../../services/dialog.service';
import { ConferenceDetail } from './entities/ConferenceDetail';
import { RoleService } from '../../services/role.service';
import { UserRoles } from '../../constants';
import { ConferenceStore } from '../conference-page/store/conferences-store.service';

@Component({
  selector: 'app-thesis-page',
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.less'
})
export class ConferencePageComponent implements OnInit {
  tabOptions = TABOPTIONS;
  selectedOption = TABOPTIONS[0].value;

  thesisCategories$ = this.conferenceStore.thesisCategories$;
  conferenceDetail: ConferenceDetail | null = null;
  isConferenceLoaded = false;

  roleInConference: string | null = null;

  alertMessage = '';
  showAlert = false;

  submissionOptions = {
    isUploaded: false,
    isBeforeDeadline: false,
  };
  reviewOptions = {
    isReviewed: false,
    isBeforeDeadline: false,
  };

  infoTabContent: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private roleService: RoleService,
    private conferenceStore: ConferenceStore,
    private conferenceService: ConferenceService
  ) {}

  ngOnInit(): void {
    const conferenceId = this.route.snapshot.params['id'];
    const submissionId = this.route.snapshot.params['submissionId'];

    if (submissionId) {
      this.loadSubmission(submissionId);
    } else {
      this.loadConference(conferenceId);
    }
  }

  private loadSubmission(submissionId: number): void {
    this.loadData(() => this.conferenceService.getSubmissionData(submissionId));
  }

  private loadConference(conferenceId: number): void {
    this.loadData(() => this.conferenceService.getConferenceData(conferenceId));
  }

  private loadData(loadFn: () => any): void {
    loadFn().subscribe({
      next: (conferenceDetail: ConferenceDetail) => {
        this.conferenceDetail = conferenceDetail;
        //console.log(conferenceDetail);
        this.isConferenceLoaded = Boolean(conferenceDetail.id);
        this.updateViewBasedOnRole();
      },
      error: (error) => {
        this.dialogService.openErrorDialog(`Problém s načítaním konferencie: ${error.error}`);
        this.navigateToHome();
      }
    });
  }

  private updateViewBasedOnRole(): void {
    if (!this.conferenceDetail) return;

    const { submission, review, submissionRole, uploadDeadline, reviewDeadline } = this.conferenceDetail;

    const isStudent = this.roleService.isStudent() && submissionRole === UserRoles.STUDENT;
    const isReviewer = this.roleService.isReviewer() && submissionRole === UserRoles.REVIEWER;

    if (isStudent) {
      this.setupStudentView(submission, uploadDeadline, review, reviewDeadline);
    } else if (isReviewer) {
      this.setupReviewerView(review, reviewDeadline);
    } else {
      this.handleUnauthorizedAccess();
    }
  }

  private setupStudentView(submission: any, uploadDeadline: string, review: any, reviewDeadline: string): void {
    this.roleInConference = UserRoles.STUDENT;
    this.submissionOptions = {
      isUploaded: Boolean(submission),
      isBeforeDeadline: new Date() < new Date(uploadDeadline),
    };
    this.reviewOptions = {
      isReviewed: Boolean(review),
      isBeforeDeadline: new Date() < new Date(reviewDeadline),
    };
    this.infoTabContent = this.getInfoTabContent(uploadDeadline, 'Na odovzdanie práce zostáva');
  }

  private setupReviewerView(review: any, reviewDeadline: string): void {
    this.roleInConference = UserRoles.REVIEWER;
    this.reviewOptions = {
      isReviewed: Boolean(review),
      isBeforeDeadline: new Date() < new Date(reviewDeadline),
    };
    this.infoTabContent = this.getInfoTabContent(reviewDeadline, 'Na napísanie posudku zostáva');
  }

  private handleUnauthorizedAccess(): void {
    if (this.roleService.isReviewer()) {
      this.dialogService.openInfoDialog('Informácia', 'Nebola vám pridelená žiadna záverečná práca na posúdenie.');
    }
    this.navigateToHome();
  }

  getInfoTabContent(dateTime: string, prefix: string): string | null {
    if (!dateTime) return null;

    const timeDifference = new Date(dateTime).getTime() - Date.now();
    if (timeDifference <= 0) return null;

    const minutes = Math.floor(timeDifference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${prefix} ${days} dní`;
    if (hours > 0) return `${prefix} ${hours} hodín`;
    if (minutes > 0) return `${prefix} ${minutes} minút`;
    return `${prefix} < 1 minúta`;
  }

  displayAlert(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 5000);
  }

  private navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
