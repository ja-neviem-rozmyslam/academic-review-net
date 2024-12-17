import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {reviewRatingOptions} from '../entities/constants';
import {ConferenceDetail} from '../entities/ConferenceDetail';
import {UserRoles} from '../../../constants';

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
  @ViewChild('noReviewTemplate', { static: true }) noReviewTemplate: TemplateRef<any>;

  showInReadMode: boolean;
  reviewFormValues: Record<string, any> = {};

  ngOnInit(): void {
    this.showInReadMode = this.reviewOptions.isReviewed;
  }

  getDisplayValue(reviewValue: string): string {
    return this.reviewRatingOptions.find(opt => opt.value === reviewValue)?.display || reviewValue;
  }

  onSubmit(): void {
    console.log(this.reviewFormValues);
  }

  getTemplate(): any {
    if(this.roleInConference === UserRoles.REVIEWER) {
      if (this.showInReadMode) {
        return this.reviewReadTemplate;
      } else if (!this.showInReadMode && this.reviewOptions.isBeforeDeadline) {
        return this.reviewFormTemplate;
      } else {
        return this.noReviewTemplate;
      }
    } else if (this.roleInConference === UserRoles.STUDENT) {
      if (this.showInReadMode) {
        return this.reviewReadTemplate;
      } else {
        return this.noReviewTemplate;
      }
    }
    return null;
  }

  protected readonly reviewRatingOptions = reviewRatingOptions;
}
