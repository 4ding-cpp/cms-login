import { NgModule } from "@angular/core";
import {
  MatStepperModule,
  MatDialogModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";

@NgModule({
  imports: [
    MatStepperModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatStepperModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [],
})
export class MateriaModule {}
