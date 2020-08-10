import { Component, ViewChild } from "@angular/core";
import { MatIconRegistry, MatDialog } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { COPYRIGHT, LoginImg, LogoImg } from "./config/config";
import { DialogAlertComponent } from "./shared/dialog/alert/dialog-alert.component";
import { AppService } from "./app.service";
import { UrlService } from "./service/url.service";
import { ICONS } from "./config";
import { MainComponent } from "./main/main.component";
import { DataService } from "./service/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild(MainComponent, { static: false })
  childComp: MainComponent;
  LoginImg = LoginImg;
  LogoImg = LogoImg
  COPYRIGHT = COPYRIGHT;
  isLocal = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private service: AppService,
    public dialog: MatDialog,
    private urlService: UrlService,
    private dataService: DataService
  ) {
    ICONS.forEach((val) => {
      this.matIconRegistry.addSvgIcon(
        val.tab,
        this.domSanitizer.bypassSecurityTrustResourceUrl(val.path)
      );
    });
  }

  ngOnInit() {}

  login() {
    let o = this.childComp.getLogin();
    this.dataService.connectLogin(o).subscribe((res: Response) => {
      console.log(666, res);
      //token set
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
