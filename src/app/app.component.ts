import {
  Component,
  ViewChild,
  TemplateRef,
  ElementRef,
  ViewContainerRef,
} from "@angular/core";
import { MatIconRegistry, MatDialog } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { AppService } from "./app.service";
import { UrlService } from "./service/url.service";
import {
  ICONS,
  TOGGLELANG,
  COPYRIGHT,
  LoginImg,
  LogoImg,
  LANG,
} from "./config";
import {
  ConnectedPosition,
  Overlay,
  FlexibleConnectedPositionStrategyOrigin,
  PositionStrategy,
  OverlayRef,
} from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { Subscription } from "rxjs/internal/Subscription";
import { MateriaDeviceService } from "./shared/materia/materia-device.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("overlayLang", { static: false }) overlayLang: TemplateRef<any>;
  @ViewChild("originLang", { static: false }) originLang: ElementRef;
  TOGGLELANG = TOGGLELANG;
  LANG = LANG;
  LoginImg = LoginImg;
  LogoImg = LogoImg;
  COPYRIGHT = COPYRIGHT;
  overlayRef: OverlayRef;
  subscription: Subscription;
  isLocal = false;
  device = "";

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private service: AppService,
    public dialog: MatDialog,
    private urlService: UrlService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private deviceService: MateriaDeviceService
  ) {
    ICONS.forEach((val) => {
      this.matIconRegistry.addSvgIcon(
        val.tab,
        this.domSanitizer.bypassSecurityTrustResourceUrl(val.path)
      );
    });
  }

  ngOnInit() {
    if (!!this.deviceService.isDeviceIn()) {
      this.subscription = this.deviceService
        .isDeviceIn()
        .subscribe((device: string) => {
          console.log(333,this.device)
          if (!!device) {
            this.device = device;
          }
        });
    }
  }

  setLocalCMS() {
    this.isLocal = !this.isLocal;
    this.urlService.setLocalCMS(this.isLocal);
  }

  toggleLang() {
    let origin = this.originLang.nativeElement;
    let position: ConnectedPosition = {
      originX: "end",
      originY: "bottom",
      overlayX: "end",
      overlayY: "top",
    };
    this.toggleOverlay(origin, position, this.overlayLang);
  }

  toggleOverlay(
    origin: FlexibleConnectedPositionStrategyOrigin,
    position: ConnectedPosition,
    overlayList: TemplateRef<any>,
    func?: Function
  ) {
    const strategy: PositionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions([position]);
    this.overlayRef = this.overlay.create({
      positionStrategy: strategy,
      hasBackdrop: true,
    });
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      this.overlayRef.attach(
        new TemplatePortal(overlayList, this.viewContainerRef)
      );
    }

    let s: Subscription = this.overlayRef.backdropClick().subscribe(() => {
      if (!!func) {
        func();
      }
      this.overlayRef.dispose();
      s.unsubscribe();
    });
  }

  processLang(lang: string) {
    this.service.setLang(lang);
    this.overlayRef.dispose();
  }
}
