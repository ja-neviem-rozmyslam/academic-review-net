import {ACTIONS, Column} from '../../../components/arn-grid-list/entities/Column';
import {CONFERENCE_CLOSED_OPTIONS} from './conference-management-constants';

export const CONFERENCE_COLUMNS: Column[] = [
  {
    title: 'Konferencia',
    name: 'conferenceName',
    width: 30,
  },
  {
    title: 'Fakulta',
    name: 'faculty',
    width: 30,
  },
  {
    title: 'Termín odovzdania',
    name: 'uploadDeadline',
    width: 20,
  },
  {
    title: 'Termín posudzovania',
    name: 'reviewDeadline',
    width: 20,
  },
  {
    title: 'Stav',
    name: 'closed',
    width: 10,
    template: (dataItem: any) => {
      const statusOption = CONFERENCE_CLOSED_OPTIONS.find(option => option.value === dataItem.closed);
      return `<span class="${dataItem.closed ? 'text-red-700' : 'text-green-800'}">${statusOption?.display}</span>`;
    }
  },
  {
      actionType: ACTIONS.EDIT,
      width: 5,
  }
];
