import { Component } from '@angular/core';
import {TABOPTIONS} from './entities/constants';

@Component({
  selector: 'app-thesis-page',
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.less'
})
export class ConferencePageComponent {

  tabOptions = TABOPTIONS;
  selectedOption = TABOPTIONS[0].value;

  onTabChange(value: string): void {
    console.log(value);
    this.selectedOption = value;
  }
}
