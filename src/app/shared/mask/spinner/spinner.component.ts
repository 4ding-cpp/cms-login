import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs/internal/Subscription";
import { State } from "../mask";
import { MaskService } from "../mask.service";

@Component({
  selector: "app-mask-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.css"],
})
export class SpinnerComponent implements OnInit {
  visible = false;
  subscription: Subscription;

  constructor(private service: MaskService, public dialog: MatDialog) {}

  ngOnInit() {
    if (!!this.service.isSpinnerIn()) {
      this.subscription = this.service
        .isSpinnerIn()
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
