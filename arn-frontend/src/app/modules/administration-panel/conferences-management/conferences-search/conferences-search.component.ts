import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CONFERENCE_CLOSED_OPTIONS} from '../entities/conference-management-constants';

@Component({
  selector: 'app-conferences-search',
  templateUrl: './conferences-search.component.html',
  styleUrl: './conferences-search.component.less'
})
export class ConferencesSearchComponent {
  @Input() searchObject: any = {};

  @Output() startSearch = new EventEmitter<any>();

  conferenceStatusOptions = CONFERENCE_CLOSED_OPTIONS;

  clearSearchCriteria(): void {
    this.searchObject = {};
  }
}
