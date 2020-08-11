import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { filter, take } from "rxjs/operators";

@Component({
  selector: "share-dialog-alert",
  templateUrl: "./dialog-alert.component.html",
  styleUrls: ["./dialog-alert.component.css"],
})
export class DialogAlertComponent implements OnInit {
  msg = "";

  constructor(
    public dialogRef: MatDialogRef<DialogAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { msg: string }
  ) {}

  ngOnInit() {
    this.dialogRef
      .keydownEvents()
      .pipe(
        filter((e: KeyboardEvent) => e.key === "Enter"),
        take(1)
      )
      .subscribe(() => {
        this.dialogRef.close();
      });

    if (!!this.data && !!this.data.msg) {
      this.msg = this.data.msg;
    }
  }
}
