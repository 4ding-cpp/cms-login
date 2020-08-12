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
import { MateriaDeviceComponent } from "./materia-device.component";
import { MateriaDeviceService } from "./materia-device.service";

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

    MateriaDeviceComponent,
  ],
  declarations: [MateriaDeviceComponent],
})
export class MateriaModule {}
