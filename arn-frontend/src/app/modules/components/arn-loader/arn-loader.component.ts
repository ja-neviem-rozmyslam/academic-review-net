import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-arn-loader',
  templateUrl: './arn-loader.component.html',
  styleUrl: './arn-loader.component.less'
})
export class ArnLoaderComponent {
  @Input() isVisible: boolean = true;
}
