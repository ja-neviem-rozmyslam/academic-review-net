import { Component } from '@angular/core';
import {UniversityService} from '../../services/university.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.less'
})
export class HomePageComponent {
  constructor(private universityService: UniversityService) {
  }

  onClick(): void {
    this.universityService.getUniversities().subscribe((response) => {
      console.log(response);
    });
  }
}
