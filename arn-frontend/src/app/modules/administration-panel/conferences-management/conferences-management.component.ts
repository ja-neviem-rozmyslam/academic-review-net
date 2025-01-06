import {Component, ViewChild} from '@angular/core';
import {CONFERENCE_COLUMNS} from './entities/columns';
import {ConferenceManagementService} from './services/conference-management.service';
import {ArnGridListComponent} from '../../components/arn-grid-list/arn-grid-list.component';
import {ConferencesSearchStore} from './store/conferences-search.store';

@Component({
  selector: 'app-conferences-management',
  templateUrl: './conferences-management.component.html',
  styleUrl: './conferences-management.component.less',
  providers: [ConferencesSearchStore]
})
export class ConferencesManagementComponent {
  @ViewChild(ArnGridListComponent) arnGridList: ArnGridListComponent;

  columns = CONFERENCE_COLUMNS;
  conferenceSearchCriteria$ = this.conferencesSearchStore.searchCriteria$;

  constructor(private conferenceManagementService: ConferenceManagementService, private conferencesSearchStore: ConferencesSearchStore) {
  }

  search = (searchObject, sortOptions) =>
    this.conferenceManagementService.getConferences(searchObject, sortOptions);

  onDoubleClick(item: any): void {
    console.log('Double click', item);
  }

  onSearchStarted() {
    this.arnGridList.refreshGrid();
  }
}
