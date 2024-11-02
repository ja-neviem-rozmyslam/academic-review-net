import {Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2} from '@angular/core';
import {AbstractControl, NgForm} from '@angular/forms';

@Directive({
  selector: '[appFormValidation]'
})
export class FormValidationDirective {
  @Output() getEmptyFields = new EventEmitter<string[]>();

  constructor(private form: NgForm, private renderer: Renderer2, private el: ElementRef) {
  }

  @HostListener('ngSubmit', ['$event'])
  onFormSubmit(event: Event): void {
    const emptyFields: string[] = [];

    Object.keys(this.form.controls).forEach(key => {
      const control: AbstractControl | null = this.form.controls[key];
      const element = this.el.nativeElement.querySelector(`[name="${key}"]`);

      if (control?.errors?.['required'] && element) {
        emptyFields.push(key);
        this.renderer.addClass(element, 'invalid');
      } else if (element) {
        this.renderer.removeClass(element, 'invalid');
      }
    });

    if (emptyFields.length > 0) {
      event.preventDefault();
      this.getEmptyFields.emit(emptyFields);
    }
  }
}
