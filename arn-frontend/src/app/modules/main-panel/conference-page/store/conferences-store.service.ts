import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {ConferenceState} from './ConferenceState';
import {ConferenceService} from '../service/conference.service';
import {Observable, switchMap, tap, withLatestFrom} from 'rxjs';
import {SubmissionService} from '../../conference/services/submission.service';

@Injectable()
export class ConferenceStore extends ComponentStore<ConferenceState> {
  readonly conferences$ = this.select((state) => state.conferences);
  readonly thesisCategories$ = this.select((state) => state.thesisCategories);
  readonly getThesesFiltered$ = (type: string, isClosed: boolean) => this.select((state) => {
    const theses = type === 'review' ? state.myConferences.myThesesForReview : state.myConferences.myTheses;
    return theses.filter(thesis => thesis.isClosed === isClosed);
  });

  readonly updateConferences = this.updater((state, conferences: any) => {
    return {
      ...state,
      conferences
    };
  });

  readonly updateThesisCategories = this.updater((state, thesisCategories: any) => {
    return {
      ...state,
      thesisCategories
    };
  });

  readonly updateConferenceJoinedStatus = this.updater((state, conferenceId: number) => {
    const updatedConferences = state.conferences
      .map(conference =>
        conference.id === conferenceId ? {...conference, joined: true} : conference
      )
      .sort((a, b) => {
        if (a.joined && !b.joined) return -1;
        if (!a.joined && b.joined) return 1;
        return a.conferenceName.localeCompare(b.conferenceName);
      });

    return {
      ...state,
      conferences: updatedConferences
    };
  });

  readonly initThesisCategories = this.effect((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.thesisCategories$),
      switchMap(([, thesisCategories]) => {
        if (thesisCategories.length === 0) {
          return this.submissionService.getThesesCategories().pipe(
            tap((categories) => {
              this.updateThesisCategories(categories);
            })
          );
        }
        return [];
      })
    )
  );

  readonly initMyTheses = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() => this.updateMyConferencesField('myTheses', this.submissionService.getUserSubmissions(false)))
    )
  );

  readonly initMyThesesForReview = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() => this.updateMyConferencesField('myThesesForReview', this.submissionService.getUserSubmissions(true)))
    )
  );

  readonly initConferences = this.effect((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.conferences$),
      switchMap(([, existingConferences]) => {
        if (existingConferences.length === 0) {
          return this.conferenceService.getConferences().pipe(
            tap((newConferences) => {
              this.updateConferences(newConferences);
            })
          );
        }
        return [];
      })
    )
  );

  constructor(private conferenceService: ConferenceService, private submissionService: SubmissionService) {
    super({
      conferences: [],
      thesisCategories: [],
      myConferences: {
        myTheses: [],
        myThesesForReview: []
      }
    });
  }

  private updateMyConferencesField(field: keyof ConferenceState['myConferences'], value$: Observable<any>) {
    return this.select((state) => state.myConferences[field]).pipe(
      switchMap((currentFieldData) => {
        if (currentFieldData.length === 0) {
          return value$.pipe(
            tap((value) => {
              this.patchState((state) => ({
                myConferences: {
                  ...state.myConferences,
                  [field]: value,
                },
              }));
            })
          );
        }
        return [];
      })
    );
  }

}
