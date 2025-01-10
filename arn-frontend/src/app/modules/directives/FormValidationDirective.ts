import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { FormValidationErrors } from '../objects/FormValidationErrors';

@Directive({
  selector: '[appFormValidation]',
})
export class FormValidationDirective {
  private validationErrors: FormValidationErrors = new FormValidationErrors();

  @Output() getValidationErrors = new EventEmitter<{ emptyFields: string[]; invalidEmails: string[] }>();

  constructor(private form: NgForm, private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('ngSubmit', ['$event'])
  onFormSubmit(event: Event): void {
    this.validationErrors = new FormValidationErrors();

    Object.keys(this.form.controls).forEach((key) => {
      const control: AbstractControl | null = this.form.controls[key];
      const element = this.el.nativeElement.querySelector(`[name="${key}"]`);

      if (control?.errors?.['required']) {
        this.addError(element, key, 'emptyFields');
      } else {
        this.removeError(element);
      }

      if (element && element.type === 'email' && !this.isValidEmail(control?.value)) {
        this.addError(element, key, 'invalidEmails');
      }

      if (element && element.type === 'file' && control?.errors?.['required']) {
        this.addError(element, key, 'emptyFields');
      }
    });

    this.validateSelects();
    this.validateFileInputs();

    if (this.validationErrors.emptyFields.length > 0 || this.validationErrors.invalidEmails.length > 0) {
      event.preventDefault();
      this.getValidationErrors.emit(this.validationErrors);
    } else {
      this.getValidationErrors.emit(null);
    }
  }

  private validateSelects(): void {
    const selectElements = this.el.nativeElement.querySelectorAll('select[required]');
    selectElements.forEach((select: HTMLSelectElement) => {
      const key = select.getAttribute('ng-reflect-name') || select.name;
      if (!select.value) {
        this.addError(select, key || 'unknown-select', 'emptyFields');
      } else {
        this.removeError(select);
      }
    });
  }

  private validateFileInputs(): void {
    const fileInputs = this.el.nativeElement.querySelectorAll('input[type="file"][required]');
    fileInputs.forEach((fileInput: HTMLInputElement) => {
      if (!fileInput.files || fileInput.files.length === 0) {
        this.addError(fileInput, fileInput.name || 'unknown-file', 'emptyFields');
      } else {
        this.removeError(fileInput);
      }
    });
  }

  private isValidEmail(email: string | null): boolean {
    if (!email) return false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  private addError(element: HTMLElement | null, key: string, errorType: keyof FormValidationErrors): void {
    if (element) {
      this.renderer.addClass(element, 'invalid');
    }
    this.validationErrors[errorType].push(key);
  }

  private removeError(element: HTMLElement | null): void {
    if (element) {
      this.renderer.removeClass(element, 'invalid');
    }
  }
}
