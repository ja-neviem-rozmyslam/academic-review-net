import {Component, OnInit} from '@angular/core';
import {RoleService} from '../../../services/role.service';
import {ReviewFormObject} from '../entities/ReviewFormObject';
import {reviewRatingOptions} from '../entities/constants';
import {ReviewBlock} from '../entities/Review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.less'
})
export class ReviewComponent implements OnInit {
  reviewDeadline: string;
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

  showInReadMode = true;
  allowEditation = true;
  reviewFormValues: Record<string, any> = {};

  reviewFormFields: ReviewFormObject[] = [
    {
      id: '1',
      reviewedCategory: 'category1',
      isTextField: false,
      isSelectionField: true
    },
    {
      id: '2',
      reviewedCategory: 'category2',
      isTextField: false,
      isSelectionField: true
    },
    {
      id: '3',
      reviewedCategory: 'category3',
      isTextField: true,
      isSelectionField: false
    }
  ];

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.handleRoleBasedView();
  }

  getDisplayValue(reviewValue: string): string {
    return this.reviewRatingOptions.find(opt => opt.value === reviewValue)?.display || reviewValue;
  }

  private handleRoleBasedView(): void {
    if (this.roleService.isReviewer()) {
      const isInDeadline = new Date() < new Date(this.reviewDeadline);
      this.showInReadMode = this.review !== null;
      this.allowEditation = isInDeadline;
    }
  }

  protected readonly reviewRatingOptions = reviewRatingOptions;


}
