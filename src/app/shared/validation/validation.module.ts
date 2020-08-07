import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ValidationService } from "./validation.service";
import { ValidationMessagesComponent } from "./validation-messages.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  providers: [ValidationService],
  imports: [CommonModule, FormsModule,TranslateModule],
  declarations: [ValidationMessagesComponent],
  exports: [ValidationMessagesComponent]
})
export class ValidationModule {}
