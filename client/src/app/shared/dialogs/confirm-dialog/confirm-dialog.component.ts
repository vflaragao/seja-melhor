import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export class ConfirmData {
  constructor (
    public title?: string,
    public message?: string,
    public denyBtn?: string,
    public actionBtn?: string,
    public isDangerous?: boolean,
  ) {}
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ConfirmData,
  ) { }

  ngOnInit() {
  }

  get actionColor() {
    return this.data.isDangerous ? 'warn' : 'primary';
  }

  get denyFocus() {
    return this.data.isDangerous ? 1 : -1;
  }

  get actionFocus() {
    return this.data.isDangerous ? -1 : 1;
  }
}
