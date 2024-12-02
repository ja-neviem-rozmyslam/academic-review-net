import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';

@Directive({
  selector: '[appFormValidation]'
})
export class FormValidationDirective {
  @Output() getValidationErrors = new EventEmitter<{ emptyFields: string[], invalidEmails: string[] }>();

  constructor(private form: NgForm, private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('ngSubmit', ['$event'])
  onFormSubmit(event: Event): void {
    const validationErrors = {
      emptyFields: [],
      invalidEmails: []
    };

    console.log(this.form.controls);

    Object.keys(this.form.controls).forEach(key => {
      const control: AbstractControl | null = this.form.controls[key];
      const element = this.el.nativeElement.querySelector(`[name="${key}"]`);

      if (control?.errors?.['required'] && element) {
        validationErrors.emptyFields.push(key);
        this.renderer.addClass(element, 'invalid');
      } else if (element) {
        this.renderer.removeClass(element, 'invalid');
      }

      if (element && element.type === 'email' && !this.isValidEmail(control?.value)) {
        validationErrors.invalidEmails.push(key);
        this.renderer.addClass(element, 'invalid');
      }

      if (element && element.type === 'file' && control?.errors?.['required']) {
        validationErrors.emptyFields.push(key);
        this.renderer.addClass(element, 'invalid');
      }
    });

    const selectElements = this.el.nativeElement.querySelectorAll('select[required]');
    selectElements.forEach((select: HTMLSelectElement) => {
      if (!select.value) {
        validationErrors.emptyFields.push(select.name);
        this.renderer.addClass(select, 'invalid');
      } else {
        this.renderer.removeClass(select, 'invalid');
      }
    });

    const fileInputs = this.el.nativeElement.querySelectorAll('input[type="file"][required]');
    fileInputs.forEach((fileInput: HTMLInputElement) => {
      if (!fileInput.files || fileInput.files.length === 0) {
        validationErrors.emptyFields.push(fileInput.name);
        this.renderer.addClass(fileInput, 'invalid');
      } else {
        this.renderer.removeClass(fileInput, 'invalid');
      }
    });

    if (validationErrors.emptyFields.length > 0 || validationErrors.invalidEmails.length > 0) {
      event.preventDefault();
      this.getValidationErrors.emit(validationErrors);
    } else {
      this.getValidationErrors.emit(null);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
