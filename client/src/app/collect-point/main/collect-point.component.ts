import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ItemUnit } from '@models/fields/item';
import { DonationStatus, DonationGetDTO } from '@models/donation';
import { CollectPointGetDTO } from '@models/collect-point';
import { ProductTypeStatistics, ProductTypeValues } from '@models/product';
import {
  StatusChangeData,
  RegisterDonationComponent,
  CollectPointQRCodeComponent,
  DonationStatusChangeComponent,
  RegisterDonationData,
} from '@dialogs/index';
import { CollectPointService } from '../collect-point.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DonationService } from '@core/donation.service';

@Component({
  selector: 'app-collect-point',
  templateUrl: './collect-point.component.html',
  styleUrls: ['./collect-point.component.scss']
})
export class CollectPointComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void>;

  private isLoading: boolean;

  private donationColumns = ['date', 'donator', 'products', 'actions'];

  private collectPoint: CollectPointGetDTO;
  private stats: ProductTypeStatistics[];

  private donations: DonationGetDTO[];

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _route: ActivatedRoute,
    private readonly _donationService: DonationService,
    private readonly _collectPointService: CollectPointService,
  ) {
    this._destroy$ = new Subject();

    this.donations = [];
    this.collectPoint = new CollectPointGetDTO();
  }

  ngOnInit() {
    this._route.paramMap
      .pipe(takeUntil(this._destroy$))
      .subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.fetchCollectPoint(id);
        }
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  async onChangeStatus(donation: DonationGetDTO) {
    const result = await this._dialog.open(DonationStatusChangeComponent, {
      data: new StatusChangeData(
        donation.items,
        DonationStatus.DONATED
      ),
    })
    .afterClosed()
    .toPromise();
    if (result) {
      try {
        this.isLoading = true;

      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async onNewDonation() {
    const result = await this._dialog.open(RegisterDonationComponent, {
      data: new RegisterDonationData(
        this.collectPoint.target._id,
        this.collectPoint._id,
        this.collectPoint.targetSource
      ),
    })
    .afterClosed()
    .toPromise();
    if (result) {
      try {
        this.isLoading = true;
        await this._donationService.save(result);
        this.donations = await this._collectPointService.getDonations(this.collectPoint._id);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    }
  }

  onQRCode() {
    const data = this.collectPoint._id;
    this._dialog.open(CollectPointQRCodeComponent, { data } );
  }

  private async fetchCollectPoint(id: string) {
    try {
      this.isLoading = true;
      this.collectPoint = await this._collectPointService.get(id);
      this.donations = await this._collectPointService.getDonations(id);
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }
}
