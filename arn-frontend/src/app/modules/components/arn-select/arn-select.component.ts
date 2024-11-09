import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { SelectOption } from './entities/SelectOption';

@Component({
  selector: 'app-arn-select',
  templateUrl: './arn-select.component.html',
  styleUrls: ['./arn-select.component.less']
})
export class ArnSelectComponent implements OnInit, OnChanges {
  @Input() placeholder: string;
  @Input() options: SelectOption[];
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() selectedOption: string | number;
  @Output() selectedOptionChange = new EventEmitter<string | number>();
  showPlaceholder: boolean = true;

  ngOnInit() {
    this.showPlaceholder = !this.selectedOption;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedOption']) {
      this.showPlaceholder = !this.selectedOption;
    }
  }
}
