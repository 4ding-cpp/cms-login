import { Component, OnInit, OnDestroy } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Subscription } from "rxjs/internal/Subscription";
import { MateriaDeviceService } from "./materia-device.service";

@Component({
  selector: "materia-device",
  template: "",
})
export class MateriaDeviceComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  device = "";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: MateriaDeviceService
  ) {}

  ngOnInit() {
    this.subscription = this.breakpointObserver
      .observe([
        "(min-width: 1200px)",
        "(max-width: 1199px)",
        "(min-width: 768px)",
        "(max-width: 767px)",
      ])
      .subscribe((r) => {
        if (r.breakpoints["(min-width: 1200px)"]) {
          this.device = "pc";
        }
        if (
          r.breakpoints["(min-width: 768px)"] &&
          r.breakpoints["(max-width: 1199px)"]
        ) {
          this.device = "pad";
        }
        if (r.breakpoints["(max-width: 767px)"]) {
          this.device = "mb";
        }
        console.log(555,this.device)
        this.service.nextDevice(this.device);
      });
  }

  ngOnDestroy() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
