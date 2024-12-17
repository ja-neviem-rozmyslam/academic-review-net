import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RoleService} from '../../../services/role.service';
import {ReviewFormObject} from '../entities/ReviewFormObject';
import {reviewRatingOptions} from '../entities/constants';
import {ConferenceDetail} from '../entities/ConferenceDetail';
import {ReviewBlock} from '../entities/Review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.less'
})
export class ReviewComponent implements OnInit {
  @Input() conferenceDetail: ConferenceDetail;
  @Input() roleInConference: string;
  @Input() reviewOptions: any;

  @ViewChild('reviewReadTemplate', { static: true }) reviewReadTemplate: TemplateRef<any>;
  @ViewChild('reviewFormTemplate', { static: true }) reviewFormTemplate: TemplateRef<any>;

  review: ReviewBlock[] = [
    {
      id: '1',
      reviewedCategory: 'category1',
      reviewValue: 'AHOJ ahoj ahoj',
      isSelectable: false,
    },
    {
      id: '2',
      reviewedCategory: 'category2',
      reviewValue: 'randoamdoaniubfa',
      isSelectable: false,
    },
    {
      id: '3',
      reviewedCategory: 'category3',
      reviewValue: '4',
      isSelectable: true,
    },
    {
      id: '4',
      reviewedCategory: 'category3',
      reviewValue: '2',
      isSelectable: true,
    }
  ];

  showInReadMode: boolean;
  reviewFormValues: Record<string, any> = {};

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.showInReadMode = this.reviewOptions.isReviewed;
  }
  getDisplayValue(reviewValue: string): string {
    return this.reviewRatingOptions.find(opt => opt.value === reviewValue)?.display || reviewValue;
  }

  onSubmit(): void {
    console.log(this.reviewFormValues);
  }

  getTemplate() {
    return this.reviewFormTemplate;
  }

  protected readonly reviewRatingOptions = reviewRatingOptions;


}
