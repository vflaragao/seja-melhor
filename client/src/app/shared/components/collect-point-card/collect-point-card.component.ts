import { Component, OnInit, Input } from '@angular/core';

import { CollectPointDTO } from '@models/collect-point';
import { DonationService } from '@core/donation.service';
import { MatDialog } from '@angular/material';
import { RegisterDonationData, RegisterDonationComponent } from '@dialogs/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collect-point-card',
  templateUrl: './collect-point-card.component.html',
  styleUrls: ['./collect-point-card.component.scss']
})
export class CollectPointCardComponent implements OnInit {

  private isLoading: boolean;

  @Input()
  private collectPoint: CollectPointDTO;

  constructor(
    private readonly _router: Router,
    private readonly _dialog: MatDialog,
    private readonly _donationService: DonationService
  ) {
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

  onSelect() {
    this._router.navigateByUrl(`/collectPoint/${this.collectPoint._id}`);
  }

  async onDonate() {
    const result = await this._dialog.open(RegisterDonationComponent, { 
      data: new RegisterDonationData(
        this.collectPoint.target,
        this.collectPoint._id,
        this.collectPoint.targetSource,
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
}
