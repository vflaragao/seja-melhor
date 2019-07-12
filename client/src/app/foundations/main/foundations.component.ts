import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { FoundationsService } from '../foundations.service';

import { Account } from '../../auth/auth.dto';
import { AccountService } from '../../auth/account.service';

import { CampaignDTO } from '@models/campaign';
import { FoundationGetDTO } from '@models/foundation';
import { CollectPointDTO } from '@models/collect-point';
import { Activity, ActivityValues } from '@models/fields/activity';

@Component({
  selector: 'app-foundations',
  templateUrl: './foundations.component.html',
  styleUrls: ['./foundations.component.scss']
})
export class FoundationsComponent implements OnInit {

  private logged: Account;
  private foundation: FoundationGetDTO;

  private activity: Activity;
  private activities: Activity[];

  private campaigns: CampaignDTO[];
  private collectPoints: CollectPointDTO[];

  private _destroy$: Subject<void>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _foundationService: FoundationsService,
    private _accountService: AccountService,
  ) {
    this._destroy$ = new Subject();
    this.activities = ActivityValues;
    this.activity = Activity.CAMPAIGN;
  }

  get isOwner() {
    return (this.foundation && this.logged) && this.foundation._id === this.logged._id;
  }

  get hasCollectPoints() {
    return this.collectPoints && this.collectPoints.length;
  }

  get hasCampaigns() {
    return this.campaigns && this.campaigns.length;
  }

  get isCampaign() {
    return this.activity === Activity.CAMPAIGN;
  }

  get isCollectPoint() {
    return this.activity === Activity.COLLECT_POINT;
  }

  get datasource() {
    switch (this.activity) {
      case Activity.CAMPAIGN:
        return this.campaigns;
      case Activity.COLLECT_POINT:
        return this.collectPoints;
    }
  }

  ngOnInit() {
    this._accountService.account
      .pipe(
        takeUntil(this._destroy$),
        switchMap((account: Account) => {
          this.logged = account;
          return this._route.paramMap;
        })
      )
      .subscribe(params => {
        const id = params.get('id') || this.logged && this.logged._id;
        if (id) {
          this.fetchFoundation(id);
        }
      })
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  onChangeTab(evt: MatTabChangeEvent) {
    this.activity = evt.tab.textLabel as Activity;
  }

  onCreateActivity() {
    if (this.activity === Activity.CAMPAIGN) {
      this.onCreateCampaign();
    } else if (this.activity === Activity.COLLECT_POINT) {

    }
  }

  private onCreateCampaign() {
    this._router.navigateByUrl('/campaigns/manage');
  }

  private async fetchFoundation(id: string) {
    try {
      this.foundation = await this._foundationService.get(id);
      this.campaigns = await this._foundationService.listCampaigns(id);
      this.collectPoints = await this._foundationService.listCollectPoints(id);
    } catch (e) {
      console.error(e);
    }
  }

}
