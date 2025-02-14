import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConferenceSearchCriteria} from '../entities/ConferenceSearchCriteria';
import {ConferencesSearchStore} from '../store/conferences-search.store';
import {CONFERENCE_CLOSED_OPTIONS} from '../entities/constants';

@Component({
  selector: 'app-conferences-search',
  templateUrl: './conferences-search.component.html',
  styleUrl: './conferences-search.component.less'
})
export class ConferencesSearchComponent {
  @Input() searchObject: ConferenceSearchCriteria;
  @Output() startSearch = new EventEmitter<any>();

  conferenceStatusOptions = CONFERENCE_CLOSED_OPTIONS;

  constructor(private conferencesSearchStore: ConferencesSearchStore) {
  }

  clearSearchCriteria(): void {
    this.conferencesSearchStore.clearSearchCriteria();
  }
}
