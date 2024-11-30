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

  constructor() {
    super({
      conferences: []
    });
  }
}
