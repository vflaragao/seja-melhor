import { Component, OnInit, Input } from '@angular/core';

import { CampaignDTO } from '@models/campaign';
import { ProductType } from '@models/product';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit {

  private progress: number;
  private loadingProgress: boolean;

  @Input()
  public campaign: CampaignDTO;

  constructor() {
    this.progress = 35;
    this.campaign = new CampaignDTO();
    this.campaign.creator = 'Casa de palha';
    this.campaign.title = 'Campanha de testes';
    this.campaign.description = 'Descrição de testes';
    this.campaign.types = [
      ProductType.TOY,
      ProductType.FOOD,
      ProductType.REMEDY,
      ProductType.CLOTHE,
    ];
    this.campaign.expiresAt = new Date('2019-07-01');
  }

  ngOnInit() {}

  get restantDays() {
    const now = new Date();
    if (this.campaign.expiresAt > now) {
      return this.campaign.expiresAt.getDate() - now.getDate();
    }
    return -1;
  }
}
