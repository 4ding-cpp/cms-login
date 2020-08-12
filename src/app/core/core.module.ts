import { NgModule, Optional, SkipSelf } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CoreRoutingModule } from "./core-routing.module";
import { CoreComponent } from "./core.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  imports: [SharedModule, CoreRoutingModule],
  declarations: [CoreComponent, LoginComponent],
  exports: [CoreComponent],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}

function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import Core modules in the AppModule only.`
    );
  }
}
