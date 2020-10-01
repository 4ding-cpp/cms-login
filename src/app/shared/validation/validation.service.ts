import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export class ValidationService {
  static passwordValidator(control: FormControl) {
    //英數字+@
    if (!control || !control.value || !control.value.match) {
      return null;
    }

    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  static ipValidator(control: FormControl) {
    if (!control || !control.value || !control.value.match) {
      return null;
    }

    if (
      control.value.match(
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      )
    ) {
      return null;
    } else {
      return { invalidIPFormat: true };
    }
  }

  static emailValidator(control: FormControl) {
    if (!control || !control.value || !control.value.match) {
      return null;
    }

    if (
      control.value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return null;
    } else {
      return { invalidEmailFormat: true };
    }
  }

  static phoneValidator(control: FormControl) {
    if (!control || !control.value || !control.value.match) {
      return null;
    }

    if (
      control.value.match(
        /^(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})$/
      )
    ) {
      return null;
    } else {
      return { invalidPhoneFormat: true };
    }
  }

  static zipCodeValidator(control: FormControl) {
    if (!control || !control.value || !control.value.match) {
      return null;
    }

    if (control.value.match(/^[0-9][0-9]{5}$/)) {
      return null;
    } else {
      return { invalidZipCode: true };
    }
  }

  //純數字
  static numberOnlyValidator(control: FormControl) {
    if (!control || !control.value || !control.value.match) {
      return null;
    }

    let val = control.value;
    if (typeof control.value === "number") {
      val = control.value.toString();
    }

    if (val.match(/^[-]*[0-9]+$/)) {
      return null;
    } else {
      return { invalidNumberOnly: true };
    }
  }

  //正整数
  static integerValidator(control: FormControl) {
    if (!control || !control.value || !control.value.match) {
      return null;
    }

    if (control.value.match(/^[1-9]\d*$/)) {
      return null;
    } else {
      return { invalidInteger: true };
    }
  }

  //repeat password
  static repeatPasswordValidator(c1: string, c2: string) {
    return (control: FormControl): ValidationErrors => {
      if (
        !control ||
        !control.value ||
        !control.value.match ||
        !control.parent
      ) {
        return;
      }
      const fg = control.parent as FormGroup;
      if (!fg) return;
      const p1 = fg.get(c1);
      const p2 = fg.get(c2);

      if (p1 === control) {
        p2.updateValueAndValidity();
        return null;
      }

      if (p1.value === p2.value) {
        return null;
      } else {
        return {
          invalidRepeatPassword: true,
        };
      }
    };
  }
}
