import {Component, OnInit} from '@angular/core';
import {TABOPTIONS} from './entities/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {ConferenceService} from '../conference-page/service/conference.service';
import {DialogService} from '../../services/dialog.service';
import {SubmissionService} from './services/submission.service';
import {take} from 'rxjs';
import {ConferenceDetail} from './entities/ConferenceDetail';
import {SelectOption} from '../../components/arn-select/entities/SelectOption';
import {RoleService} from '../../services/role.service';
import {UserRoles} from '../../constants';

@Component({
  selector: 'app-thesis-page',
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.less'
})
export class ConferencePageComponent implements OnInit {
  tabOptions = TABOPTIONS;
  selectedOption = TABOPTIONS[0].value;

  thesisCategories: SelectOption[] = [];

  conferenceDetail: ConferenceDetail;
  isConferenceLoaded = false;

  roleInConference: string;

  submissionOptions = {
    isUploaded: false,
    isBeforeDeadline: false,
  };
  reviewOptions = {
    showInReadMode: false,
    allowEditation: false,
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private submissionService: SubmissionService,
    private roleService: RoleService,
    private conferenceService: ConferenceService) {
  }

  ngOnInit(): void {
    const conferenceId = this.route.snapshot.params['id'];
    if (!conferenceId) {
      this.redirectToHome();
      return;
    }
    this.loadConferenceData(conferenceId);
  }

  private loadConferenceData(conferenceId: number): void {
    this.conferenceService.getConferenceData(conferenceId).subscribe({
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
    this.submissionService.getThesesCategories().pipe(take(1)).subscribe((categories) => {
      this.thesisCategories = categories;
    });
  }

  private handleRoleBasedView(): void {
    const isUploaded = this.conferenceDetail.submission !== null;
    if (this.roleService.isStudent()) {
      this.roleInConference = UserRoles.STUDENT;
      this.submissionOptions.isUploaded = isUploaded;
      this.submissionOptions.isBeforeDeadline = new Date() < new Date(this.conferenceDetail.uploadDeadline);
    } else if (this.roleService.isReviewer()) {
      this.roleInConference = UserRoles.REVIEWER;
      this.submissionOptions.isUploaded = isUploaded;
    } else {
      this.redirectToHome();
    }
  }

  private handleSubmissionView(): void {

  }

  private redirectToHome(): void {
    this.router.navigate(['/']);
  }
}
