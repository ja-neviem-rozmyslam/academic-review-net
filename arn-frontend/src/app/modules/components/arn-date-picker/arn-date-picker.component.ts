import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-arn-date-picker',
  templateUrl: './arn-date-picker.component.html',
  styleUrls: ['./arn-date-picker.component.less']
})
export class ArnDatePickerComponent implements OnInit {
  @Input() name: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() selectedDate: string = '';
  @Input() dateTime: boolean = false;
  @Output() selectedDateChange = new EventEmitter<string>();

  ngOnInit() {
    if (this.selectedDate && this.dateTime === false) {
      const dateOnly = this.selectedDate.split(' ')[0];
      this.selectedDate = dateOnly;
    }
  }
}
