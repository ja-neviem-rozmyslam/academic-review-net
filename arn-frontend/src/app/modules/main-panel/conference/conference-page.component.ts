import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
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

  conferenceDetail: ConferenceDetail =
    {
      "id": 1,
      "uploadDeadline": "2024-12-16 23:59:59",
      "reviewDeadline": "2025-01-15 23:59:59",
      "submission": {
        "id": 11,
        "title": "asd",
        "category": 1,
        "abstractEn": "asd",
        "abstractSk": "asd",
        "coauthors": [
          "eb3b24dc-1a7e-43dd-8cb2-25fa42e3cdca"
        ],
        "uploadedFiles": []
      },
      "review": null,
      "reviewForm": null
    };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private conferenceService: ConferenceService) {}

  ngOnInit(): void {
    const conferenceId = this.route.snapshot.params['id'];
    if (!conferenceId) {
      this.redirectToHome();
      return;
    }
    //this.loadConferenceData(conferenceId);
  }

  private loadConferenceData(conferenceId: number): void {
    this.conferenceService.getConferenceData(conferenceId).subscribe({
      next: (response) => {
        this.conferenceDetail = response;
        console.log('Conference detail:', this.conferenceDetail);
      },
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
