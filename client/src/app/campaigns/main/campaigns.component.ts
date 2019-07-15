import { Component, OnInit } from '@angular/core';
import { CampaignGetDTO, ActionCategory } from '@models/campaign';
import { ProductType, ProductTypeStatistics } from '@models/product';
import { CampaignsService } from '../campaigns.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CollectPointGetDTO } from '@models/collect-point';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  private _destroy$: Subject<void>;

  private isLoading: boolean;

  private campaign: CampaignGetDTO;
  private collectPoints: CollectPointGetDTO[];

  private typeStats: ProductTypeStatistics[];

  constructor(
    private readonly _router: ActivatedRoute,
    private readonly _campaignService: CampaignsService,
  ) {
    this._destroy$ = new Subject();
  }

  ngOnInit() {
      this._router.paramMap
        .pipe(takeUntil(this._destroy$))
        .subscribe(params => {
          const id = params.get('id');
          this.fetchCampaign(id);
        })
  }

  get containsSite() {
    if (!this.campaign || !this.campaign.creator.social) { return false; }
    return this.campaign.creator.social.site;
  }

  get containsSocialMedia() {
    if (!this.campaign || !this.campaign.creator.social) { return false; }
    const { facebook, instagram, twitter } = this.campaign.creator.social;
    return facebook || instagram || twitter;
  }

  open(url: string) {
    window.open(url, '_blank');
  }

  private async fetchCampaign(id: string) {
    try {
      this.isLoading = true;
      this.campaign = await this._campaignService.get(id);
      this.collectPoints = await this._campaignService.getCollectPoints(id, undefined);
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }
}
