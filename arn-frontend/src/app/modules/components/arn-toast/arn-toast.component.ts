import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-arn-toast',
  templateUrl: './arn-toast.component.html',
  styleUrls: ['./arn-toast.component.less']
})
export class ArnToastComponent implements OnInit, OnChanges {
  @Input() showToast: boolean = false;
  toastState: 'enter' | 'exit' = 'enter';

  ngOnInit() {
    if (this.showToast) {
      setTimeout(() => {
        this.toastState = 'exit';
        setTimeout(() => {
          this.showToast = false;
        }, 300);
      }, 5000);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showToast']) {
      if (this.showToast) {
        this.toastState = 'enter';
      }
    }
  }

  closeToast() {
    this.toastState = 'exit';
    setTimeout(() => {
      this.showToast = false;
    }, 300);
  }
}
