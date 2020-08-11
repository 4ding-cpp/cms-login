import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs/internal/Subscription";
import { State } from "../mask";
import { MaskService } from "../mask.service";

@Component({
  selector: "app-mask-circle",
  templateUrl: "./circle.component.html",
  styleUrls: ["./circle.component.css"],
})
export class CircleComponent implements OnInit {
  visible = false;
  subscription: Subscription;

  constructor(private service: MaskService, public dialog: MatDialog) {}

  ngOnInit() {
    if (!!this.service.isCircleIn()) {
      this.subscription = this.service
        .isCircleIn()
        .subscribe((state: State) => {
          this.visible = state.show;
        });
    }
  }

  ngOnDestroy() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
