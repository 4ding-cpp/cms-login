import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule, MatDialogModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { DialogAlertComponent } from "./alert/dialog-alert.component";

@NgModule({
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [DialogAlertComponent],
  exports: [DialogAlertComponent],
  entryComponents: [DialogAlertComponent]
})
export class DialogModule {}
