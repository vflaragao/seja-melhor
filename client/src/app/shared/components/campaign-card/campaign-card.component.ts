import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CampaignDTO } from '@models/campaign';
import { Router } from '@angular/router';
import { DonationService } from '@core/donation.service';
import { MatDialog } from '@angular/material';
import { RegisterDonationComponent, RegisterDonationData } from '@dialogs/index';
import { ActivityCollection } from '@models/fields/activity';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit {

  constructor (
    private _router: Router,
    private _dialog: MatDialog,
    private _donationService: DonationService,
  ) {
    this.campaign = new CampaignDTO();
  }

  private isLoading: boolean;

  @Input()
  public showCategory: boolean = true;
  @Input()
  public showAuthor: boolean = true;

  @Input()
  public campaign: CampaignDTO;

  ngOnInit() {}

  async onDonate() {
    const result = await this._dialog.open(RegisterDonationComponent, { 
      data: new RegisterDonationData(
        this.campaign._id,
        null,
        ActivityCollection.CAMPAIGN,
      ),
    }).afterClosed().toPromise();
    if (result) {
      try {
        this.isLoading = true;
        await this._donationService.save(result);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    }
  }

  onSelect() {
    this._router.navigateByUrl(`/campaigns/${this.campaign._id}`);
  }
}
