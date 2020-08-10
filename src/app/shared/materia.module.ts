import { NgModule } from "@angular/core";
import {
  MatStepperModule,
  MatDialogModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatRadioModule,
} from "@angular/material";

@NgModule({
  imports: [
    MatStepperModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
  ],
  exports: [
    MatStepperModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
  ],
  declarations: [],
})
export class MateriaModule {}
