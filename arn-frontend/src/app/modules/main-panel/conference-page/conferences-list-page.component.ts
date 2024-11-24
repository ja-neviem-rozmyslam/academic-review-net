import { Component } from '@angular/core';
import {Conference} from './entities/Conference';

@Component({
  selector: 'app-conference-page',
  templateUrl: './conferences-list-page.component.html',
  styleUrl: './conferences-list-page.component.less'
})
export class ConferencesListPageComponent {
  conferences: Conference[] = [
    {
      id: 1,
      name: 'AI Innovations Summit',
      faculty: 'Computer Science Faculty',
      joined: true,
      uploadDeadline: '2024-11-30',
      reviewDeadline: '2024-12-15',
      creationDate: '2024-01-10',
      reviewForm: 'AIReviewForm'
    },
    {
      id: 2,
      name: 'Sustainable Energy Conference',
      faculty: 'Engineering Faculty',
      joined: true,
      uploadDeadline: '2024-09-10',
      reviewDeadline: '2024-09-25',
      creationDate: '2023-12-01',
      reviewForm: 'EnergyReviewForm'
    },
    {
      id: 3,
      name: 'Medical Technology Expo',
      faculty: 'Health Sciences Faculty',
      joined: false,
      uploadDeadline: '2024-07-15',
      reviewDeadline: '2024-08-01',
      creationDate: '2023-11-20',
      reviewForm: 'MedTechReviewForm'
    },
    {
      id: 4,
      name: 'Education Futures Forum',
      faculty: 'Education Faculty',
      joined: false,
      uploadDeadline: '2024-10-01',
      reviewDeadline: '2024-10-20',
      creationDate: '2024-02-15',
      reviewForm: 'EducationReviewForm'
    },
    {
      id: 5,
      name: 'Environmental Research Congress',
      faculty: 'Environmental Sciences Faculty',
      joined: false,
      uploadDeadline: '2024-06-20',
      reviewDeadline: '2024-07-10',
      creationDate: '2023-09-05',
      reviewForm: 'EnviroReviewForm'
    }
  ];

  searchTerm: string = '';

  get filteredConferences(): Conference[] {
    return this.conferences.filter(conference =>
      conference.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
