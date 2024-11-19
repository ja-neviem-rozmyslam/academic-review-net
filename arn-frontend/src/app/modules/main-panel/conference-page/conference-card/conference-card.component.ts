import {Component, Input} from '@angular/core';
import { Conference } from '../entities/Conference';

@Component({
  selector: 'app-conference-card',
  templateUrl: './conference-card.component.html',
  styleUrl: './conference-card.component.less'
})
export class ConferenceCardComponent {
  @Input() conference: Conference;
}
