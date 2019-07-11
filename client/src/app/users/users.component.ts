import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { Account } from '../auth/auth.dto';

import { UserDTO } from '@models/user';
import { CampaignDTO } from '@models/campaign';
import { CollectPointDTO } from '@models/collect-point';

import { UsersService } from './users.service';
import { AccountService } from '../auth/account.service';
import { Activity, ActivityValues } from '@models/fields/activity';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  private logged: Account;
  private user: UserDTO;

  private activity: Activity;
  private activities: Activity[];

  private campaigns: CampaignDTO[];
  private collectPoints: CollectPointDTO[];

  private _destroy$: Subject<void>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UsersService,
    private _accountService: AccountService
  ) {
    this._destroy$ = new Subject();
    this.activities = ActivityValues;
    this.activity = Activity.CAMPAIGN;
  }

  get isOwner() {
    return (this.user && this.logged) && this.user._id === this.logged._id;
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
          this.fetchUser(id);
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

  private async fetchUser(id: string) {
    try {
      this.user = await this._userService.get(id);
      this.campaigns = await this._userService.listCampaigns(id);
      this.collectPoints = await this._userService.listCollectPoints(id);
    } catch (e) {
      console.error(e);
    }
  }
}
