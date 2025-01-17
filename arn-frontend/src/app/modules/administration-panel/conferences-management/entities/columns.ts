import {Column} from '../../../components/arn-grid-list/entities/Column';
import {CONFERENCE_CLOSED_OPTIONS} from './constants';

export const CONFERENCE_COLUMNS: Column[] = [
  {
    title: 'Konferencia',
    name: 'conferenceName',
    width: 30,
  },
  {
    title: 'Fakulta',
    name: 'faculty',
    width: 25,
  },
  {
    title: 'Termín odovzdania (do)',
    name: 'uploadDeadline',
    width: 17,
  },
  {
    title: 'Termín posudzovania (do)',
    name: 'reviewDeadline',
    width: 18,
  },
  {
    title: 'Stav',
    name: 'closed',
    width: 8,
    template: (dataItem: any) => {
      const statusOption = CONFERENCE_CLOSED_OPTIONS.find(option => option.value === dataItem.closed);
      return `<span class="${dataItem.closed ? 'text-red-700' : 'text-green-800'}">${statusOption?.display}</span>`;
    }
  }
];
