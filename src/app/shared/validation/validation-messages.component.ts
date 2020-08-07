import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "validation-messages",
  templateUrl: "./validation-messages.component.html",
  styleUrls: ["./validation-messages.component.css"],
})
export class ValidationMessagesComponent {
  @Input() control: FormControl;
  constructor() {}

  get errorMessage() {
    if (!!this.control) {
      for (let propertyName in this.control.errors) {
        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          this.control.touched
        ) {
          return propertyName;
        }
      }
    }
    return null;
  }
}
