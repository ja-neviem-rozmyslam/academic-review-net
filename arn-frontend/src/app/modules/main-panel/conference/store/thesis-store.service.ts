import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {ThesisState} from './ThesisState';
import {ConferenceDetail} from '../entities/ConferenceDetail';

@Injectable()
export class ThesisStore extends ComponentStore<ThesisState> {
  readonly conferenceDetail$ = this.select((state) => state.conferenceDetail);
  readonly submission$ = this.select(this.conferenceDetail$, (conferenceDetail) => conferenceDetail.submission);

  readonly setConferenceDetail = this.updater((state, conferenceDetail: ConferenceDetail) => ({
    ...state,
    conferenceDetail,
  }));

  constructor() {
    super({
      conferenceDetail: {
        id: null,
        uploadDeadline: '',
        reviewDeadline: '',
        submission: undefined,
        review: [],
        reviewForm: [],
      }
    });
  }
}
