import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-collect-point-qrcode',
  templateUrl: './collect-point-qrcode.component.html',
  styleUrls: ['./collect-point-qrcode.component.scss']
})
export class CollectPointQRCodeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: string
  ) { }

  ngOnInit() {
  }

  onPrint() {
    window.print();
  }
}
