import { Component, OnInit, Input } from '@angular/core';

import { CampaignDTO } from '@models/campaign';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit {

  @Input()
  public showCategory: boolean = true;
  @Input()
  public showAuthor: boolean = true;

  @Input()
  public campaign: CampaignDTO;

  constructor() {
    this.campaign = new CampaignDTO();
  }

  ngOnInit() {}
}
