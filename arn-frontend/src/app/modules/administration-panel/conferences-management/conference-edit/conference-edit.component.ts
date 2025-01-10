import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ASSIGN, EDIT, SUBMISSION, TABOPTIONS} from '../entities/constants';
import {ConferenceEditService} from './services/conference-edit.service'

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

  constructor(private router: Router, private conferenceEditService: ConferenceEditService) {}

  ngOnInit(): void {
    this.item = window.history.state.item;
    if(this.item == null) {
      this.viewConferences();
    }
  }

  viewConferences() {
    this.router.navigate(['/administration/conference-management']);
  }

  updateConference() {
    this.conferenceEditService.saveConference(this.item.id, this.item).subscribe({
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
