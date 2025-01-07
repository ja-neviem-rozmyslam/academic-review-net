import {ACTIONS, Column} from '../../../components/arn-grid-list/entities/Column';
import {User} from '../../../objects/User';
import {UserPrettyNames} from '../../../constants';

export const USER_COLUMNS: Column[] = [
  {
    title: 'Meno',
    name: 'name',
    width: 20,
    template: (dataItem: User) => {
        return dataItem.surname + ', ' + dataItem.name;
    },
  },
  {
    title: 'Email',
    name: 'email',
    width: 25,
  },
  {
    title: 'Univerzita',
    name: 'university',
    width: 40,
    template: (dataItem: User) => {
      return dataItem.university?.name;
    },
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
    actionCondition: (dataItem: any) => !dataItem.verified,
    width: 5,
  }
];
