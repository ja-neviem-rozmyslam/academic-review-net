import { ACTIONS, Column } from '../../../components/arn-grid-list/entities/Column';
import { User } from '../../../objects/User';
import {UserPrettyNames, UserRoles} from '../../../constants';

export function getUserColumns(isAdminSearch: boolean): Column[] {
  const columns: Column[] = [
    {
      title: 'Meno',
      name: 'name',
      width: 20,
      template: (dataItem: User) => {
        return dataItem.surname + ', ' + dataItem.name;
      },
    },
    {
      title: isAdminSearch ? 'Prihlasovacie meno' : 'Email',
      name: 'email',
      width: 25,
    },
    {
      title: 'Rola',
      name: 'roles',
      width: 20,
      template: (dataItem: User) => {
        return dataItem.roles.map(role => UserPrettyNames[role]).join(', ');
      },
    },
    {
      actionType: ACTIONS.EDIT,
      width: 5,
    },
    {
      actionType: ACTIONS.DELETE,
      actionCondition: (dataItem: any) => (!dataItem.verified) || (isAdminSearch && dataItem.roles.length === 1 && dataItem.roles[0] === UserRoles.ADMIN),
      width: 5,
    }
  ];

  if (!isAdminSearch) {
    columns.splice(2, 0, {
      title: 'Univerzita',
      name: 'university',
      width: 40,
      template: (dataItem: User) => {
        return dataItem.university?.name;
      },
    });
  }

  return columns;
}
