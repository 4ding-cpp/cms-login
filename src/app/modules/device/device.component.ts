import { Component, OnInit, OnDestroy } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Subscription } from "rxjs/internal/Subscription";
import { DeviceService } from "./device.service";

@Component({
  selector: "app-device",
  template: "",
})
export class DeviceComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  device = "";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: DeviceService
  ) {}

  ngOnInit() {
    this.subscription = this.breakpointObserver
      .observe([
        "(min-width: 1200px)",
        "(max-width: 1199px)",
        "(min-width: 768px)",
        "(max-width: 767px)",
        "(min-width: 500px)",
        "(max-width: 499px)",
      ])
      .subscribe((r) => {
        if (r.breakpoints["(min-width: 1200px)"]) {
          this.device = "pc";
        }
        if (
          r.breakpoints["(min-width: 768px)"] &&
          r.breakpoints["(max-width: 1199px)"]
        ) {
          this.device = "padBig";
        }
        if (
          r.breakpoints["(min-width: 500px)"] &&
          r.breakpoints["(max-width: 767px)"]
        ) {
          this.device = "padSmall";
        }
        if (r.breakpoints["(max-width: 499px)"]) {
          this.device = "mb";
        }
        this.service.nextDevice(this.device);
      });
  }

  ngOnDestroy() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
