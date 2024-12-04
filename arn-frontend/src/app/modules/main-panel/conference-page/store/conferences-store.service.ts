import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {ConferenceState} from './ConferenceState';

@Injectable()
export class ConferenceStore extends ComponentStore<ConferenceState> {
  readonly conferences$ = this.select((state) => state.conferences);


  readonly updateConferences = this.updater((state, conferences: any) => {
    return {
      ...state,
      conferences
    };
  });

  readonly updateConferenceJoinedStatus = this.updater((state, conferenceId: number) => {
    const updatedConferences = state.conferences.map(conference =>
      conference.id === conferenceId ? {...conference, joined: true} : conference
    );
    return {
      ...state,
      conferences: updatedConferences
    };
  });

  constructor() {
    super({
      conferences: []
    });
  }
}
