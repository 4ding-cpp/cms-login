import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SpinnerComponent } from "./spinner/spinner.component";
import { CircleComponent } from "./circle/circle.component";
import { LoadComponent } from "./load/load.component";
import { MaskService } from "./mask.service";

@NgModule({
  providers: [MaskService],
  imports: [CommonModule],
  declarations: [SpinnerComponent, CircleComponent, LoadComponent],
  exports: [SpinnerComponent, CircleComponent, LoadComponent],
})
export class MaskModule {}
