import { Component } from '@angular/core';
import {CONFERENCE_COLUMNS} from './entities/columns';
import {ConferenceManagementService} from './services/conference-management.service';

@Component({
  selector: 'app-conferences-management',
  templateUrl: './conferences-management.component.html',
  styleUrl: './conferences-management.component.less'
})
export class ConferencesManagementComponent {

  columns = CONFERENCE_COLUMNS;

  constructor(private conferenceManagementService: ConferenceManagementService) {
  }

  search = (searchObject, sortOptions) =>
    this.conferenceManagementService.getConferences(searchObject, sortOptions);

  onDoubleClick(item: any): void {
    console.log('Double click', item);
  }
}
