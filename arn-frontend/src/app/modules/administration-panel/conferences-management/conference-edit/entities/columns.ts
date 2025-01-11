import {Column} from '../../../../components/arn-grid-list/entities/Column';
import {ArnSearchSelectComponent} from '../../../../components/arn-search-select/arn-search-select.component';

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
    width: 20,
    component: ArnSearchSelectComponent,
    options: [
      { label: 'Žiadny', value: '1' },
      { label: 'Janko Hraško', value: '2' },
      { label: 'Peter Vrátny', value: '3' },
      { label: 'Mária Nováková', value: '4' },
    ],
    onSelectionChange: (selectedValue, dataItem) => {
      console.log(`Selected "${selectedValue}" for "${dataItem.title}"`);
      dataItem.reviewer = selectedValue;
    },
  }
];
