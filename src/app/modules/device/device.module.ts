import { NgModule } from "@angular/core";
import { LayoutModule } from "@angular/cdk/layout";
import { DeviceComponent } from "./device.component";
import { DeviceService } from "./device.service";

@NgModule({
  imports: [LayoutModule],
  declarations: [DeviceComponent],
  exports: [DeviceComponent],
  providers: [DeviceService],
})
export class DeviceModule {}
