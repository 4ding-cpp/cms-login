import { Component } from "@angular/core";
import { MatIconRegistry, MatDialog } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { COPYRIGHT, ICONS, LANG, LOGOURL, BACKURL } from "./config/config";
import { DialogAlertComponent } from "./shared/dialog/alert/dialog-alert.component";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { AppService } from "./app.service";
import { UrlService } from "./service/url.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  LANG = LANG;
  LOGOURL = LOGOURL;
  BACKURL = BACKURL;
  COPYRIGHT = COPYRIGHT;
  form: FormGroup;
  isLocal = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private fb: FormBuilder,
    private service: AppService,
    public dialog: MatDialog,
    private urlService: UrlService,
    private http: HttpClient
  ) {
    ICONS.forEach((val) => {
      this.matIconRegistry.addSvgIcon(
        val.tab,
        this.domSanitizer.bypassSecurityTrustResourceUrl(val.path)
      );
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      account: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      otp: [""],
      seLang: [this.service.getDefaultLang()],
    });
  }

  submit() {
    this.login(
      this.form.value.account,
      this.form.value.password,
      this.form.value.otp
    ).subscribe((val) => {
      if (!val.e && !!val.token) {
        window.location.href = `${this.urlService.getCMSHost(val.token)}`;
      } else {
        this.dialogOpen(val.e);
      }
    });
  }

  login(account: string, password: string, otp: string): Observable<any> {
    const url = this.urlService.getLoginHost();
    const body = {
      account: account,
      password: password,
      OTP: otp,
    };
    const headers = new HttpHeaders().set(
      "Content-Type",
      "text/plain; charset=utf-8"
    );
    return this.http
      .post(url, JSON.stringify(body), {
        headers: headers,
      })
      .pipe(
        map((res: Response) => {
          return res;
        })
      );
  }

  dialogOpen(errorcode: number) {
    this.dialog.open(DialogAlertComponent, {
      width: "300px",
      data: {
        errorcode: errorcode,
      },
    });
  }

  setLocalCMS() {
    this.isLocal = !this.isLocal;
    this.urlService.setLocalCMS(this.isLocal);
  }

  useLang(lang: string) {
    this.service.setLang(lang);
  }
}
