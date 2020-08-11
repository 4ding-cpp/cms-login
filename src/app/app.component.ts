import { Component } from "@angular/core";
import { MatIconRegistry, MatDialog } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { COPYRIGHT, LoginImg, LogoImg } from "./config/config";
import { AppService } from "./app.service";
import { UrlService } from "./service/url.service";
import { ICONS } from "./config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  LoginImg = LoginImg;
  LogoImg = LogoImg;
  COPYRIGHT = COPYRIGHT;
  isLocal = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
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

  ngOnInit() {}

  setLocalCMS() {
    this.isLocal = !this.isLocal;
    this.urlService.setLocalCMS(this.isLocal);
  }

  useLang(lang: string) {
    this.service.setLang(lang);
  }
}
