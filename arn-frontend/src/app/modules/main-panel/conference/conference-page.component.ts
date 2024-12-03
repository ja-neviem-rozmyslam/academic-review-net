import {Component, OnInit} from '@angular/core';
import {TABOPTIONS} from './entities/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../../services/role.service';
import {SubmissionService} from '../../services/submission.service';

@Component({
  selector: 'app-thesis-page',
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.less'
})
export class ConferencePageComponent implements OnInit {
  tabOptions = TABOPTIONS;
  selectedOption = TABOPTIONS[0].value;

  conferenceId: number;
  submission: any = {};

  submissionReadMode: boolean = true;
  reviewReadMode: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    private roleService: RoleService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.conferenceId = this.route.snapshot.params['id'];
    this.handleRoleBasedView();
  }

  onTabChange(value: string): void {
    this.selectedOption = value;
  }

  private handleRoleBasedView(): void {
    this.fetchExistingSubmission((data: any) => {
      if (this.roleService.isStudent()) {
        this.submissionReadMode = !!data;
        if (data) {
          this.submission = data; //COMPONENT STORE
        }
      } else if (this.roleService.isReviewer()) {
        if (data) {
          this.submission = data;
          this.submissionReadMode = true;
        } else {
          this.submissionReadMode = true;
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  private fetchExistingSubmission(callback: (data: any) => void): void {
    this.submissionService.getSubmission(this.conferenceId).subscribe({
      next: (data) => callback(data),
      error: (err) => (console.error('Error fetching submission:', err)),
    });
  }
}
