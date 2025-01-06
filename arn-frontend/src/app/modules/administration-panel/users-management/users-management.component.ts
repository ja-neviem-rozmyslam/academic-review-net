import {Component, ViewChild} from '@angular/core';
import {ArnGridListComponent} from '../../components/arn-grid-list/arn-grid-list.component';
import {USER_COLUMNS} from './entities/columns';
import {UsersManagementService} from './services/users-management.service';
import {UsersSearchStore} from './store/users-search-store';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.less',
  providers: [UsersSearchStore]
})
export class UsersManagementComponent {
  @ViewChild(ArnGridListComponent) arnGridList: ArnGridListComponent;

  columns = USER_COLUMNS;

  UsersSearchCriteria$ = this.usersSearchStore.searchCriteria$;

  constructor(private usersManagementService: UsersManagementService, private usersSearchStore: UsersSearchStore) {

  }

  search = (searchObject, sortOptions) =>
    this.usersManagementService.getUsers(searchObject, sortOptions);

  deleteUser(user: any): void {
    console.log('Delete user', user);
  }

  editUser(user: any): void {
    console.log('Edit user', user);
  }

  onSearchStarted() {
    this.arnGridList.refreshGrid();
  }

}
