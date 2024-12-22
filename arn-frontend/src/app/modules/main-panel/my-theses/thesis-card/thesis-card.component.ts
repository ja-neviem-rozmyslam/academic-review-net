import {Component, Input} from '@angular/core';
import {MyThesis} from '../entities/MyThesis';
import {Router} from '@angular/router';
import {SelectOption} from '../../../components/arn-select/entities/SelectOption';

@Component({
  selector: 'app-thesis-card',
  templateUrl: './thesis-card.component.html',
  styleUrl: './thesis-card.component.less'
})
export class ThesisCardComponent {
  @Input() thesis: MyThesis;
  @Input() thesisCategories: SelectOption[];

  constructor(private router: Router) {
  }

  getThesisCategoryName(): string {
    return this.thesisCategories.find(category => category.value === this.thesis.category).display;
  }

  openConference() {
    this.router.navigate(['/main/conferences', this.thesis.conferenceId]);
  }
}
