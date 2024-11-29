import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-arn-fileinput',
  templateUrl: './arn-fileinput.component.html',
  styleUrl: './arn-fileinput.component.less'
})
export class ArnFileinputComponent implements OnInit {
  @Input() placeholder: string = 'Vyberte súbor';
  @Input() required: boolean = false;
  @Input() multiple: boolean = false;
  @Input() acceptedFormats: string = '';
  @Output() fileSelected = new EventEmitter<File>();

  fileName: string;

  ngOnInit(): void {
    this.fileName = this.placeholder;
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileName = file.name;
    this.fileSelected.emit(file);
  }
}
