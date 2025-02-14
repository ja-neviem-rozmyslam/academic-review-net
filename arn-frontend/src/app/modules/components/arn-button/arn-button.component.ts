import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-arn-button',
  templateUrl: './arn-button.component.html',
  styleUrls: ['./arn-button.component.less']
})
export class ArnButtonComponent {
  @Input({ required: true }) buttonText: string;
  @Input() negativeColor: boolean = false;
  @Input() classes: string = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() customColor: string = '';
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

}
