import { FormControl } from "@angular/forms";

export class ValidationService {

  static passwordValidator(control: FormControl) {
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  static userValidator(control: FormControl) {
    //英數字+@
    if (control.value.match(/^.[A-Za-z0-9@]+$/)) {
      return null;
    } else {
      return { invalidAccount: true };
    }
  }

}
