import {Component, OnInit, ViewChild} from '@angular/core';
import {ArnGridListComponent} from '../../components/arn-grid-list/arn-grid-list.component';
import {getUserColumns} from './entities/columns';
import {UsersManagementService} from './services/users-management.service';
import {UsersSearchStore} from './store/users-search-store';
import {User} from '../../objects/User';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, take, tap} from 'rxjs';
import {Column} from '../../components/arn-grid-list/entities/Column';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.less',
  providers: [UsersSearchStore]
})
export class UsersManagementComponent implements OnInit {
  @ViewChild(ArnGridListComponent) arnGridList: ArnGridListComponent;

  isAdminSearch: boolean;
  columns: Column[];
  usersSearchCriteria$ = this.usersSearchStore.searchCriteria$;

  constructor(private usersManagementService: UsersManagementService,
              private route: ActivatedRoute,
              private usersSearchStore: UsersSearchStore) {
  }

  ngOnInit(): void {
    combineLatest([this.route.data, this.usersSearchCriteria$]).pipe(
      take(1),
      tap(([routeData, criteria]) => {
        this.isAdminSearch = routeData['isAdminSearch'] || false;
        this.columns = getUserColumns(this.isAdminSearch);
        this.usersSearchStore.patchState({
          searchCriteria: {
            ...criteria,
            isAdmin: this.isAdminSearch
          }
        });
      })
    ).subscribe();
  }

  search = (searchObject, sortOptions) =>
    this.usersManagementService.getUsers(searchObject, sortOptions);

  deleteUser(user: User): void {
    console.log('Delete user', user);
  }

  editUser(user: User): void {
    console.log('Edit user', user);
  }

  onSearchStarted() {
    this.arnGridList.refreshGrid();
  }

}
