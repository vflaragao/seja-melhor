import { Component, OnInit, Inject } from '@angular/core';

import { Item } from '@models/fields/item';
import { CollectPointGetDTO } from '@models/collect-point';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface RegisterDonationData {
  availableItems: Item[];
  selectedCollectPoint: string;
  availableCollectPoints: CollectPointGetDTO[];
}

@Component({
  selector: 'app-register-donation',
  templateUrl: './register-donation.component.html',
  styleUrls: ['./register-donation.component.scss']
})
export class RegisterDonationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: RegisterDonationData,
  ) {}

  ngOnInit() {
  }
}
