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
    template: (row) => {
      return row.author === null ? 'Žiadny' : `${row.author.name} ${row.author.surname}`;
    }
  },
  {
    title: 'Recenzent',
    name: 'reviewer',
    width: 30,
    options: [
      { label: 'Žiadny', value: '1' },
      { label: 'Janko asd', value: '2' },
      { label: 'Peter Vrátny', value: '3' },
      { label: 'Mária Nováková', value: '4' },
    ],
    onSelectionChange: (event) => {
      console.log(event);
    },
  }
];
