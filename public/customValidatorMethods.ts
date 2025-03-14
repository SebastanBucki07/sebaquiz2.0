import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Custom validator to disallow special characters and spaces
export function noSpecialCharactersOrSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = /[^a-zA-Z0-9]/.test(control.value);
    return forbidden ? { 'noSpecialCharactersOrSpaces': { value: control.value } } : null;
  };
}