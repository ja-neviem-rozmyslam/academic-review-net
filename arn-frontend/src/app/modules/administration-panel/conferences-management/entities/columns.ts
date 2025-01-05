import {Column} from '../../../components/arn-grid-list/entities/Column';

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
      return dataItem.closed ? 'Aktívna' : 'Ukončená';
    }
  }
];
