import {Component, Input} from '@angular/core';
import {Conference} from '../entities/Conference';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../services/dialog.service';
import {ConferenceJoinModalComponent} from './conference-join-modal/conference-join-modal.component';

@Component({
  selector: 'app-conference-card',
  templateUrl: './conference-card.component.html',
  styleUrl: './conference-card.component.less'
})
export class ConferenceCardComponent {
  @Input() conference: Conference;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService) {
  }

  joinConference() {
    this.dialogService.openCustomModal(ConferenceJoinModalComponent, {
        placement: 'center',
        backdrop: 'dynamic'
    }, {conferenceId: this.conference.id, hasPassword: this.conference.hasPassword});
  }

  openConference() {
    this.router.navigate([this.conference.id], {relativeTo: this.route});
  }
}
