import {Component, Inject} from '@angular/core';
import {BaseModal} from '../../../../components/base-modal/entities/BaseModal';
import {ConferenceService} from '../../service/conference.service';
import {ConferenceStore} from '../../store/conferences-store.service';

@Component({
  selector: 'app-conference-join-modal',
  templateUrl: './conference-join-modal.component.html',
  styleUrls: []
})
export class ConferenceJoinModalComponent extends BaseModal {
  password: string = '';
  errorMessage: string = '';

  constructor(private conferenceService: ConferenceService, private conferenceStore: ConferenceStore,
              @Inject('modalData') public data: {conferenceId: number}) {
    super();
  }

  requestJoin() {
    this.conferenceService.requestConferenceJoin(this.data.conferenceId, this.password).subscribe({
      next: () => {
        this.closeModal();
        this.conferenceStore.updateConferenceJoinedStatus(this.data.conferenceId);
      },
      error: (error:any ) => {
        console.error('Error joining conference:', error);
        this.errorMessage = error;
      }
    });
  }
}
