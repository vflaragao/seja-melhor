import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Item } from '@models/fields/item';
import { DonationStatus } from '@models/donation';

export class StatusChangeData {

  constructor (
    public items?: Item[],
    public targetStatus?: DonationStatus,
  ) {}
}

@Component({
  selector: 'app-donation-status-change',
  templateUrl: './donation-status-change.component.html',
  styleUrls: ['./donation-status-change.component.scss']
})
export class DonationStatusChangeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StatusChangeData,
    private ref: MatDialogRef<DonationStatusChangeComponent>
  ) { }

  ngOnInit() {
  }

  get colorAction() {
    return this.data.targetStatus === DonationStatus.CANCELED
      ? 'warn'
      : 'primary';
  }

  onConfirm() {
    this.ref.close(true);
  }
}
