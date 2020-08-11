import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { AppService } from "./app.service";
import { RouterModule } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoginComponent } from "./login/login.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    SharedModule,
    RouterModule.forRoot([
      { path: "login", component: AppComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ]),
  ],
  providers: [
    { provide: "HOST", useValue: window.location.hostname },
    { provide: "PROTOCOL", useValue: window.location.protocol },
    AppService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
