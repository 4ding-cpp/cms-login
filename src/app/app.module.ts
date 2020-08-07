import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatDialogModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatRadioModule } from '@angular/material';
import { SharedModule } from './shared/shared.module';
import { AppService } from './app.service';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18N } from './config';
import { UrlService } from './service/url.service';
import { LoggerService } from './service/logger.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, I18N, '.json');
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
        deps: [HttpClient]
      }
    }),
    SharedModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,
    RouterModule.forRoot([{ path: 'login', component: AppComponent }, { path: '', redirectTo: 'login', pathMatch: 'full' }])
  ],
  providers: [
    { provide: 'HOST', useValue: window.location.hostname },
    { provide: 'PROTOCOL', useValue: window.location.protocol },
    AppService,
    UrlService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
