import {
  Component,
  ViewChild,
  TemplateRef,
  ElementRef,
  ViewContainerRef,
} from "@angular/core";
import {
  ConnectedPosition,
  Overlay,
  FlexibleConnectedPositionStrategyOrigin,
  PositionStrategy,
  OverlayRef,
} from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { Subscription } from "rxjs/internal/Subscription";
import {
  TOGGLELANG,
  LANG,
  LoginImg,
  LogoImg,
  COPYRIGHT,
  LogoMBImg,
} from "../config";
import { AppService } from "../app.service";
import { UrlService } from "../service/url.service";
import { DeviceService } from "../modules/device/device.service";

@Component({
  selector: "app-core",
  templateUrl: "./core.component.html",
  styleUrls: ["./core.component.css"],
})
export class CoreComponent {
  @ViewChild("overlayLang", { static: false }) overlayLang: TemplateRef<any>;
  @ViewChild("originLang", { static: false }) originLang: ElementRef;
  TOGGLELANG = TOGGLELANG;
  LANG = LANG;
  LoginImg = LoginImg;
  LogoImg = LogoImg;
  LogoMBImg = LogoMBImg;
  COPYRIGHT = COPYRIGHT;
  overlayRef: OverlayRef;
  subscription: Subscription;
  isLocal = false;
  device = "";

  constructor(
    public appService: AppService,
    private urlService: UrlService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private deviceService: DeviceService
  ) {}

  ngOnInit() {
    if (!!this.deviceService.isDeviceIn()) {
      this.subscription = this.deviceService
        .isDeviceIn()
        .subscribe((device: string) => {
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
    this.appService.setLang(lang);
    this.overlayRef.dispose();
  }
}
