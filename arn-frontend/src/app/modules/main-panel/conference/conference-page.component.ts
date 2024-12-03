import {Component, OnInit} from '@angular/core';
import {TABOPTIONS} from './entities/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {ConferenceDetail} from './entities/ConferenceDetail';
import {ConferenceService} from '../conference-page/service/conference.service';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-thesis-page',
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.less'
})
export class ConferencePageComponent implements OnInit {
  tabOptions = TABOPTIONS;
  selectedOption = TABOPTIONS[0].value;

  conferenceDetail: ConferenceDetail;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private conferenceService: ConferenceService,
  ) {}

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
      next: (response) => this.conferenceDetail = response,
      error: (error) => {
        this.redirectToHome();
        this.dialogService.openErrorDialog(`Problém s načítaním konferencie: ${error}`);
      }
    });
  }

  private redirectToHome(): void {
    this.router.navigate(['/']);
  }

  onTabChange(value: string): void {
    this.selectedOption = value;
  }
}
