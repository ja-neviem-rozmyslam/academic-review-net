import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {ConferenceState} from './ConferenceState';
import { ConferenceService } from '../service/conference.service';
import {filter, map, switchMap, tap, withLatestFrom} from 'rxjs';

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

  readonly initConferences = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.conferenceService.getConferences().pipe(
          withLatestFrom(this.conferences$),
          filter(([_, existingConferences]) => existingConferences.length === 0),
          tap(([newConferences]) => {
            this.updateConferences(newConferences);
          })
        )
      )
    )
  );

  constructor(private conferenceService: ConferenceService) {
    super({
      conferences: []
    });
  }
}
