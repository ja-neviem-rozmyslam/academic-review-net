import {Component, ViewChild} from '@angular/core';
import {CONFERENCE_COLUMNS} from './entities/columns';
import {ConferenceManagementService} from './services/conference-management.service';
import {ArnGridListComponent} from '../../components/arn-grid-list/arn-grid-list.component';
import {ConferencesSearchStore} from './store/conferences-search.store';
import {Router} from '@angular/router';
import {DialogService} from '../../services/dialog.service';
import {ConferenceCreateModalComponent} from './conference-create-modal/conference-create-modal.component';

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

  constructor(private conferenceManagementService: ConferenceManagementService,
              private conferencesSearchStore: ConferencesSearchStore,
              private dialogService: DialogService,
              private router: Router) {
  }

  search = (searchObject, sortOptions) =>
    this.conferenceManagementService.getConferences(searchObject, sortOptions);

  onDoubleClick(item: any): void {
    this.router.navigate(['/administration/conference', item.id], {state: {item}});
  }

  addNewConference(): void {
    const modalRef = this.dialogService.openCustomModal(ConferenceCreateModalComponent);

    modalRef.instance.conferenceCreated.subscribe(() => {
      this.arnGridList.refreshGrid();
    });
  }

  onSearchStarted() {
    this.arnGridList.refreshGrid();
  }
}
