import { Component } from '@angular/core';
import {Conference} from './entities/Conference';

@Component({
  selector: 'app-conference-page',
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.less'
})
export class ConferencePageComponent {
  conferences: Conference[] = [
    {
      id: 1,
      name: 'Conference 1',
      faculty: 'Faculty 1',
      password: 'password1',
      uploadDeadline: '2021-01-01',
      reviewDeadline: '2021-01-02',
      creationDate: '2021-01-03',
      reviewForm: 'reviewForm1'
    },
    {
      id: 2,
      name: 'Conference 2',
      faculty: 'Faculty 2',
      password: 'password2',
      uploadDeadline: '2021-02-01',
      reviewDeadline: '2021-02-02',
      creationDate: '2021-02-03',
      reviewForm: 'reviewForm2'
    },
    {
      id: 2,
      name: 'Conference 2',
      faculty: 'Faculty 2',
      password: 'password2',
      uploadDeadline: '2021-02-01',
      reviewDeadline: '2021-02-02',
      creationDate: '2021-02-03',
      reviewForm: 'reviewForm2'
    },
    {
      id: 2,
      name: 'Conference 2',
      faculty: 'Faculty 2',
      password: 'password2',
      uploadDeadline: '2021-02-01',
      reviewDeadline: '2021-02-02',
      creationDate: '2021-02-03',
      reviewForm: 'reviewForm2'
    }
  ]
}
