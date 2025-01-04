import {Column} from '../../../components/arn-grid-list/entities/Column';

export const CONFERENCE_COLUMNS: Column[] = [
  {
    title: 'Konferencia',
    name: 'name',
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
    width: 30,
  },
  {
    title: 'Termín posudzovania',
    name: 'reviewDeadline',
    width: 30,
  },
  {
    title: 'Stav',
    name: 'status',
    width: 30,
    template: (dataItem: any) => {
      return dataItem.status ? 'Aktívna' : 'Ukončená';
    }
  }
];
