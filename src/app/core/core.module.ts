import { NgModule, Optional, SkipSelf } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CoreRoutingModule } from "./core-routing.module";
import { CoreComponent } from "./core.component";
import { ErrorComponent } from "./error/error.component";
import { GuardService } from "./guard.service";
import { LoginComponent } from "./login/login.component";

@NgModule({
  imports: [SharedModule, CoreRoutingModule],
  declarations: [CoreComponent, LoginComponent, ErrorComponent],
  exports: [CoreComponent],
  providers: [GuardService],
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
