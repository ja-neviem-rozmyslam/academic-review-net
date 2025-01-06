import {ACTIONS, Column} from '../../../components/arn-grid-list/entities/Column';

export const USER_COLUMNS: Column[] = [
  {
    title: 'Meno',
    name: 'name',
    width: 30,
    template: (dataItem: any) => {
        return dataItem.name + ' ' + dataItem.surname;
    },
  },
  {
    title: 'Email',
    name: 'email',
    width: 30,
  },
  {
    title: 'Univerzita',
    name: 'university',
    width: 20,
  },
  {
    title: 'Rola',
    name: 'role',
    width: 20,
  },
  {
    actionType: ACTIONS.EDIT,
    width: 10,
  },
  {
    actionType: ACTIONS.DELETE,
    actionCondition: (dataItem: any) => !dataItem.verified,
    width: 10,
  }
];
