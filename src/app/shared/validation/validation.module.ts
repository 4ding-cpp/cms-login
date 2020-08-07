import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ValidationService } from "./validation.service";
import { ValidationMessagesComponent } from "./validation-messages.component";
import { TranslateModule } from "@ngx-translate/core";
import { ValidationDirective } from "./validation.directive";
import { MatIconModule } from "@angular/material";

@NgModule({
  providers: [ValidationService],
  imports: [CommonModule, FormsModule, TranslateModule, MatIconModule],
  declarations: [ValidationMessagesComponent, ValidationDirective],
  exports: [ValidationMessagesComponent, ValidationDirective],
})
export class ValidationModule {}
