import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppService } from "./app.service";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";
import { MatIconModule } from "@angular/material";
import { MaskModule } from "./shared/mask/mask.module";
import { DialogModule } from "./shared/dialog/dialog.module";
import { CoreModule } from "./core/core.module";
import { DeviceModule } from "./modules/device/device.module";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
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
    MatIconModule,
    DialogModule,
    MaskModule,
    DeviceModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: "HOST", useValue: window.location.hostname },
    { provide: "PROTOCOL", useValue: window.location.protocol },
    AppService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
