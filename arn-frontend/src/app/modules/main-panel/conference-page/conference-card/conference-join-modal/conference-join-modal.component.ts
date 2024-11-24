import {Component, Inject} from '@angular/core';
import {BaseModal} from '../../../../components/base-modal/entities/BaseModal';
import {ConferenceService} from '../../service/conference.service';

@Component({
  selector: 'app-conference-join-modal',
  templateUrl: './conference-join-modal.component.html',
  styleUrls: []
})
export class ConferenceJoinModalComponent extends BaseModal {
  password: string = '';

  constructor(private conferenceService: ConferenceService,
              @Inject('modalData') public data: {conferenceId: number}) {
    super();
  }

  requestJoin() {
    this.conferenceService.requestConferenceJoin(this.data.conferenceId, this.password).subscribe(() => {
      this.closeModal();
    });
  }
}
