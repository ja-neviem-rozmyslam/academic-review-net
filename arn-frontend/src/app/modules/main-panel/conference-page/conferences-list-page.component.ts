import {Component, OnInit} from '@angular/core';
import {Conference} from './entities/Conference';
import {ConferenceService} from './service/conference.service';
import {ConferenceStore} from './store/conferences-store.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-conference-page',
  templateUrl: './conferences-list-page.component.html',
  styleUrls: ['./conferences-list-page.component.less'],
  providers: [ConferenceService]
})
export class ConferencesListPageComponent implements OnInit {
  conferences$: Observable<Conference[]> = this.conferenceStore.conferences$;
  filteredConferences$: Observable<Conference[]> = this.conferences$;
  currentPageConferences: Conference[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 6;
  totalItems: number;

  constructor(private conferenceService: ConferenceService, private conferenceStore: ConferenceStore) {
  }

  ngOnInit(): void {
    this.conferenceStore.initConferences();

    this.filteredConferences$.subscribe(filtered => {
      this.totalItems = filtered.length;
      this.updateCurrentPageConferences(filtered);
    });
  }

  onSearch(): void {
    this.filteredConferences$ = this.conferences$.pipe(
      map(conferences =>
        conferences.filter(conference =>
          conference.conferenceName.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      )
    );
    this.filteredConferences$.subscribe(filtered => {
      this.totalItems = filtered.length;
      this.currentPage = 1;
      this.updateCurrentPageConferences(filtered);
    });
  }

  loadNewConferences(): void {
    this.conferenceService.getConferences().subscribe(conferences => {
      this.conferenceStore.updateConferences(conferences);
    });
  }

  updateCurrentPageConferences(conferences: Conference[]): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentPageConferences = conferences.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.filteredConferences$.subscribe(filtered => {
      this.updateCurrentPageConferences(filtered);
    });
  }
}
