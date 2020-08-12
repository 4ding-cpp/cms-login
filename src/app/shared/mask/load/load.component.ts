import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs/internal/Subscription";
import { State } from "../mask";
import { MaskService } from "../mask.service";

@Component({
  selector: "mask-load",
  templateUrl: "./load.component.html",
  styleUrls: ["./load.component.css"],
})
export class LoadComponent implements OnInit {
  visible = true;
  subscription: Subscription;

  constructor(private service: MaskService, public dialog: MatDialog) {}

  ngOnInit() {
    if (!!this.service.isLoadIn()) {
      this.subscription = this.service.isLoadIn().subscribe((state: State) => {
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
