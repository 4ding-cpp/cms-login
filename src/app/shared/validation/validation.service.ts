import { FormControl } from "@angular/forms";

export class ValidationService {
  static passwordValidator(control: FormControl) {
    //英數字+@
    if (
      !!control.value &&
      !!control.value.match &&
      control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,100}$/)
    ) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  static ipValidator(control: FormControl) {
    //ip
    if (
      !!control.value.match &&
      control.value.match(
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      )
    ) {
      return null;
    } else {
      return { invalidIP: true };
    }
  }

  static emailValidator(control: FormControl) {
    //email
    if (
      !!control.value.match &&
      control.value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return null;
    } else {
      return { invalidEmail: true };
    }
  }

  static numberOnlyValidator(control: FormControl) {
    //純數字+.
    let val = control.value;
    if (!!val) {
      if (typeof val == "number") {
        val = val.toString();
      }
      if (val.match(/[0-9]|\./)) {
        return null;
      } else {
        return { invalidNumberOnly: true };
      }
    }
  }

  static integerValidator(control: FormControl) {
    //正整数
    if (!!control.value.match && control.value.match(/^[1-9]\d*$/)) {
      return null;
    } else {
      return { invalidInteger: true };
    }
  }

  static matchingPasswords(otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate(control: FormControl) {
      if (!control.parent) {
        return null;
      }
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error(
            "matchingPasswords(): other control is not found in parent group"
          );
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }
      if (!otherControl) {
        return null;
      }
      if (otherControl.value !== thisControl.value) {
        return {
          invalidRepeatPassword: true,
        };
      }
      return null;
    };
  }
}