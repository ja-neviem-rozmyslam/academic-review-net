import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-arn-fileinput',
  templateUrl: './arn-fileinput.component.html',
  styleUrls: ['./arn-fileinput.component.less']
})
export class ArnFileinputComponent implements OnInit {
  @Input() placeholder: string;
  @Input() invalid: boolean = false;
  @Input() required: boolean = false;
  @Input() multiple: boolean = false;
  @Input() acceptedFormats: string = '';
  @Input() fileLimit: number = Infinity;
  @Input() set fileSelected(files: File | File[]) {
    this.selectedFiles = Array.isArray(files) ? files : files ? [files] : [];
    if (!this.multiple && this.selectedFiles.length > 0) {
      this.fileName = this.selectedFiles[0].name;
    }
  }
  @Output() fileSelectedChange = new EventEmitter<File | File[]>();

  fileName: string = '';
  selectedFiles: File[] = [];

  ngOnInit(): void {
    if (!this.multiple) {
      this.placeholder = this.placeholder || 'Vyberte súbor';
      this.fileName = this.placeholder;
    }
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.fileName = file.name;
      this.selectedFiles = [file];
      this.fileSelectedChange.emit(this.selectedFiles);
    }
  }

  onMultipleFilesChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      if (this.selectedFiles.length + files.length > this.fileLimit) {
        this.selectedFiles = this.selectedFiles.slice(0, this.fileLimit - files.length);
      }
      this.selectedFiles = [...this.selectedFiles, ...Array.from(files)].slice(0, this.fileLimit);
      this.fileSelectedChange.emit(this.selectedFiles);
      (event.target as HTMLInputElement).value = '';
    }
  }

  removeFile(file: File, event: Event): void {
    event.preventDefault();
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    this.fileSelectedChange.emit(this.selectedFiles);
  }

  truncateFileName(fileName: string): string {
    const maxLength = 20;
    return fileName.length > maxLength ? `${fileName.slice(0, maxLength)}...` : fileName;
  }
}
