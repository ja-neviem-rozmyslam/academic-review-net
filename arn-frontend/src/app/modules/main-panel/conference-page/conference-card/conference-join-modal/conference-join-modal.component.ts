import {Component, Inject} from '@angular/core';
import {BaseModal} from '../../../../components/base-modal/entities/BaseModal';
import {ConferenceService} from '../../service/conference.service';
import {ConferenceStore} from '../../store/conferences-store.service';
import {UtilityService} from '../../../../services/utility.service';

@Component({
  selector: 'app-conference-join-modal',
  templateUrl: './conference-join-modal.component.html',
  styleUrls: []
})
export class ConferenceJoinModalComponent extends BaseModal {
  password: string = '';
  errorMessage: string = '';

  constructor(private conferenceService: ConferenceService, private conferenceStore: ConferenceStore,
              private utilityService: UtilityService,
              @Inject('modalData') public data: {conferenceId: number, hasPassword: boolean}) {
    super();
  }

  requestJoin() {
    this.conferenceService.requestConferenceJoin(this.data.conferenceId, this.password).subscribe({
      next: () => {
        this.closeModal();
        this.conferenceStore.updateConferenceJoinedStatus(this.data.conferenceId);
      },
      error: (error:any ) => {
       this.errorMessage = this.utilityService.handleResponseError(error);
      }
    });
  }
}
