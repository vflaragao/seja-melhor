import { Component, OnInit, Input } from '@angular/core';

import { CollectPointDTO } from '@models/collect-point';

@Component({
  selector: 'app-collect-point-card',
  templateUrl: './collect-point-card.component.html',
  styleUrls: ['./collect-point-card.component.scss']
})
export class CollectPointCardComponent implements OnInit {

  @Input()
  private collectPoint: CollectPointDTO;

  constructor() {
    this.collectPoint = new CollectPointDTO;
  }

  ngOnInit() {
  }

  get restantDays() {
    const now = new Date();
    if (this.collectPoint.expiresAt > now) {
      return this.collectPoint.expiresAt.getDate() - now.getDate();
    }
    return -1;
  }
}
