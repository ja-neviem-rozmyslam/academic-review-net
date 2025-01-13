import {Component, OnInit, ViewChild} from '@angular/core';
import {ArnGridListComponent} from '../../components/arn-grid-list/arn-grid-list.component';
import {getUserColumns} from './entities/columns';
import {UsersManagementService} from './services/users-management.service';
import {UsersSearchStore} from './store/users-search-store';
import {User} from '../../objects/User';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, take, tap} from 'rxjs';
import {Column} from '../../components/arn-grid-list/entities/Column';
import {DialogService} from '../../services/dialog.service';
import {EditUserModalComponent} from "./edit-user-modal/edit-user-modal.component";
import {RoleService} from '../../services/role.service';
import {AdminCreationModalComponent} from './admin-creation-modal/admin-creation-modal.component';
import _ from 'lodash';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.less',
  providers: [UsersSearchStore]
})
export class UsersManagementComponent implements OnInit {
  @ViewChild(ArnGridListComponent) arnGridList: ArnGridListComponent;


  isAdminSearch: boolean;
  isUserSuperAdmin: boolean = false;
  columns: Column[];
  usersSearchCriteria$ = this.usersSearchStore.searchCriteria$;

  constructor(private usersManagementService: UsersManagementService,
              private route: ActivatedRoute,
              private usersSearchStore: UsersSearchStore,
              private roleService: RoleService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    combineLatest([this.route.data, this.usersSearchCriteria$]).pipe(
      take(1),
      tap(([routeData, criteria]) => {
        this.isAdminSearch = routeData['isAdminSearch'] || false;
        this.isUserSuperAdmin = this.roleService.isSuperAdmin();
        this.columns = getUserColumns(this.isAdminSearch, this.isUserSuperAdmin);
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
    this.dialogService.openConfirmDialog('Vymazať používateľa', `Chcete naozaj vymazať používateľa ${user.name}?`, () => {
      this.usersManagementService.deleteUser(user.id).subscribe(() => {
        this.arnGridList.refreshGrid();
      });
    }, {confirm: 'Vymazať', cancel: 'Zrušiť'});
  }

  editUser(user: User): void {
    const modalRef = this.dialogService.openCustomModal(EditUserModalComponent, {
      placement: 'center',
      backdrop: 'dynamic',
      closable: false,
    }, {user: _.cloneDeep(user), isAdminEdit: this.isAdminSearch});
    modalRef.instance.profileUpdated.subscribe(() => {
      this.arnGridList.refreshGrid();
    });
  }

  addNewAdmin(): void {
    const modalRef = this.dialogService.openCustomModal(AdminCreationModalComponent);
    modalRef.instance.adminCreated.subscribe(() => {
      this.arnGridList.refreshGrid();
    });
  }

  onSearchStarted() {
    this.arnGridList.refreshGrid();
  }

}
