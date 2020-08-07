import { Component } from "@angular/core";
import { MatIconRegistry, MatDialog } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { COPYRIGHT, LANG } from "./config/config";
import { DialogAlertComponent } from "./shared/dialog/alert/dialog-alert.component";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { AppService } from "./app.service";
import { UrlService } from "./service/url.service";
import { ICONS } from "./config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  LANG = LANG;
  COPYRIGHT = COPYRIGHT;
  form: FormGroup;
  isLocal = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private fb: FormBuilder,
    private service: AppService,
    public dialog: MatDialog,
    private urlService: UrlService
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
      seLang: [this.service.getLang()],
    });
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
