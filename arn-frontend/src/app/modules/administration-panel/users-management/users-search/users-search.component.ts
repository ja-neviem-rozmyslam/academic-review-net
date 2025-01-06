import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsersSearchCriteria} from '../entities/UsersSearchCriteria';
import {UsersSearchStore} from '../store/users-search-store';
import {USERS_ROLE_OPTIONS} from '../entities/users-management-constants';
import {UniversityService} from '../../../services/university.service';
import {SelectOption} from '../../../components/arn-select/entities/SelectOption';
@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrl: './users-search.component.less'
})

export class UsersSearchComponent implements OnInit {
  @Input() searchObject: UsersSearchCriteria;
  @Output() startSearch = new EventEmitter<any>();
  userRoleOptions = USERS_ROLE_OPTIONS;
  universityOptions: SelectOption[];


  constructor(private usersSearchStore: UsersSearchStore, private universityService: UniversityService) {

  }

  ngOnInit(): void {
    this.universityService.getUniversities().subscribe(universities => {
      this.universityOptions = universities.map(university => ({
        value: university.id,
        display: university.name
      }));
    });
  }

  clearSearchCriteria(): void {
    this.usersSearchStore.clearSearchCriteria();
  }

}
