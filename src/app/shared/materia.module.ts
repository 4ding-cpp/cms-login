import { NgModule } from "@angular/core";
import { LayoutModule } from "@angular/cdk/layout";
import { CdkTableModule } from "@angular/cdk/table";
import { OverlayModule } from "@angular/cdk/overlay";
import { PlatformModule } from "@angular/cdk/platform";
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
    LayoutModule,
    CdkTableModule,
    OverlayModule,
    PlatformModule,
    MatStepperModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
  ],
  exports: [
    LayoutModule,
    CdkTableModule,
    OverlayModule,
    PlatformModule,
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
