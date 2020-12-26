import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreComponent } from "./core.component";
import { ErrorComponent } from "./error/error.component";
import { GuardService } from "./guard.service";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "",
    component: CoreComponent,
    children: [
      {
        path: "login/in",
        canActivate: [GuardService],
        component: LoginComponent,
      },
      {
        path: "error",
        component: ErrorComponent,
      },
      { path: "", redirectTo: "login/in", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
