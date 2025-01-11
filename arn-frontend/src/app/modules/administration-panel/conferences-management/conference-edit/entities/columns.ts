import {Column} from '../../../../components/arn-grid-list/entities/Column';

export const CONFERENCE_COLUMNS: Column[] = [
  {
    title: 'Názov práce',
    name: 'title',
    width: 30,
  },
  {
    title: 'Študent',
    name: 'author',
    width: 30,
    template: (row) => `${row.author.name} ${row.author.surname}`,
  },
  {
    title: 'Recenzent',
    name: 'reviewer',
    width: 20,
    template: (row) => {
      return row.reviewer === null ? 'Žiadny' : `${row.reviewer.name} ${row.reviewer.surname}`;
    }
  }
];
