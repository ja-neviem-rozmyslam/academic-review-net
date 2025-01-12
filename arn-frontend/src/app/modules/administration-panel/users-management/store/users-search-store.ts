import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {UsersSearchState} from '../entities/UsersSearchState';

@Injectable()
export class UsersSearchStore extends ComponentStore<UsersSearchState> {
  readonly searchCriteria$ = this.select((state) => state.searchCriteria);

  readonly clearSearchCriteria = this.updater(state => ({
    searchCriteria: {
      isAdmin: state.searchCriteria.isAdmin
    }
  }));

  constructor() {
    super({
      searchCriteria: {}
    });
  }

}
