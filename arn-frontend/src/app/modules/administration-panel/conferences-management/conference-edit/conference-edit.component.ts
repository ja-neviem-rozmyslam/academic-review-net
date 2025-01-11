import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ASSIGN, EDIT, SUBMISSION, TABOPTIONS} from '../entities/constants';
import {CONFERENCE_COLUMNS} from './entities/columns'
import {ConferenceManagementService} from '../services/conference-management.service';
@Component({
  selector: 'app-conference-edit',
  templateUrl: './conference-edit.component.html',
  styleUrl: './conference-edit.component.less'
})
export class ConferenceEditComponent implements OnInit {
  item: any;
  tabOptions = TABOPTIONS;
  selectedOption = TABOPTIONS[0].value;

  showAlert: boolean;
  alertMessage: string;
  columns = CONFERENCE_COLUMNS;
  submissions: any;

  constructor(private router: Router, private conferenceService: ConferenceManagementService) {}

  ngOnInit(): void {
    this.item = window.history.state.item;
    this.getSubmissions();
    if(this.item == null) {
      this.viewConferences();
    }
  }

  getSubmissions() {
    this.conferenceService.getSubmissions(this.item.id).subscribe({
          next: (data) => {
            this.submissions = data.body;
          }
    });
  }

  downloadData() {
    this.conferenceService.downloadData(this.item.id).subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `konferencia-${this.item.id}.zip`;
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Nastal problém pri sťahovaní súborov: ', err);
      }
    });
  }

  viewConferences() {
    this.router.navigate(['/administration/conference-management']);
  }

  updateConference() {
    this.conferenceService.saveConference(this.item.id, this.item).subscribe({
      next: () => {
        this.showAlert = true;
        this.alertMessage = "Údaje konferencie boli zmenené.";
        setTimeout(() => this.showAlert= false, 3000);
      }
    });
  }

  protected readonly EDIT = EDIT;
  protected readonly ASSIGN = ASSIGN;
  protected readonly SUBMISSION = SUBMISSION;
}
