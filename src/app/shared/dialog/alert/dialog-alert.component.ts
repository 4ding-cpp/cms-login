import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorCodeService } from 'src/app/shared/dialog/alert/base/errorcode.service';

@Component({
  selector: 'share-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent extends ErrorCodeService {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { errorcode: number }) {
    super();
  }

  getMsgName(): string {
    return super.getMsgName(this.data.errorcode);
  }
}
