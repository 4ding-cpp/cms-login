import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { filter, take } from "rxjs/operators";

@Component({
  selector: "dialog-alert",
  templateUrl: "./dialog-alert.component.html",
  styleUrls: ["./dialog-alert.component.css"],
})
export class DialogAlertComponent implements OnInit {
  errorName = "";

  constructor(
    public dialogRef: MatDialogRef<DialogAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { errorName: string }
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

    if (!!this.data && !!this.data.errorName) {
      this.errorName = this.data.errorName;
    }
  }
}
