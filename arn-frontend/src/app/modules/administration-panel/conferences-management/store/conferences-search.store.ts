import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {ConferenceSearchState} from '../entities/ConferenceSearchState';

@Injectable()
export class ConferencesSearchStore extends ComponentStore<ConferenceSearchState> {
  readonly searchCriteria$ = this.select((state) => state.searchCriteria);

  readonly clearSearchCriteria = this.updater(() => ({
    searchCriteria: {},
  }));

  constructor() {
    super({
      searchCriteria: {}
    });
  }

}
