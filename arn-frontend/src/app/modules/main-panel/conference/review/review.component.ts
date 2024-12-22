import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {reviewRatingOptions} from '../entities/constants';
import {ConferenceDetail} from '../entities/ConferenceDetail';
import {UserRoles} from '../../../constants';
import {ReviewBlock} from '../entities/Review';
import {SubmissionService} from '../services/submission.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.less'
})
export class ReviewComponent implements OnInit {
  @Input() conferenceDetail: ConferenceDetail;
  @Input() roleInConference: string;
  @Input() reviewOptions: any;

  @ViewChild('reviewReadTemplate', {static: true}) reviewReadTemplate: TemplateRef<any>;
  @ViewChild('reviewFormTemplate', {static: true}) reviewFormTemplate: TemplateRef<any>;
  @ViewChild('noReviewTemplate', {static: true}) noReviewTemplate: TemplateRef<any>;

  showInReadMode: boolean;
  reviewFormValues: Record<string, any> = {};

  constructor(private submissionService: SubmissionService) {
  }

  ngOnInit(): void {
    this.showInReadMode = this.reviewOptions.isReviewed;
  }

  getDisplayValue(reviewValue: string): string {
    return this.reviewRatingOptions.find(opt => opt.value === reviewValue)?.display || reviewValue;
  }

  onSubmit(): void {
    const reviewBlocks: ReviewBlock[] = Object.keys(this.reviewFormValues).map((id) => {
      const field = this.conferenceDetail.reviewForm.find(f => f.id === id);
      return {
        id: id,
        reviewedCategory: field.reviewedCategory,
        reviewValue: this.reviewFormValues[id],
        isSelectable: field.isSelectionField,
      };
    });

    this.submissionService.saveReview(this.conferenceDetail.submission.id, reviewBlocks).subscribe(
      (result) => {
        this.conferenceDetail.review = result as ReviewBlock[];
        this.reviewOptions.isReviewed = true;
        this.showInReadMode = true;
      },
      (error) => console.error('Error:', error)
    );
  }

  openEditForm(): void {
    this.submissionService.getReview(this.conferenceDetail.submission.id).subscribe((reviewResponse) => {
      reviewResponse.forEach((reviewBlock: ReviewBlock) => {
        this.reviewFormValues[reviewBlock.id] = reviewBlock.reviewValue;
      });

      this.showInReadMode = false;
    });
  }

  getTemplate(): any {
    if (this.roleInConference === UserRoles.REVIEWER) {
      if (this.showInReadMode) {
        return this.reviewReadTemplate;
      } else if (!this.showInReadMode && this.reviewOptions.isBeforeDeadline) {
        return this.reviewFormTemplate;
      } else {
        return this.noReviewTemplate;
      }
    } else if (this.roleInConference === UserRoles.STUDENT) {
      if (this.showInReadMode && !this.reviewOptions.isBeforeDeadline) {
        return this.reviewReadTemplate;
      } else {
        return this.noReviewTemplate;
      }
    }
    return null;
  }

  protected readonly reviewRatingOptions = reviewRatingOptions;
}
