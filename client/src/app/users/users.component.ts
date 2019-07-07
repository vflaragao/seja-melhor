import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { Account } from '../auth/auth.dto';

import { UserDTO } from '@models/user';
import { CampaignDTO } from '@models/campaign';
import { CollectPointDTO } from '@models/collect-point';

import { UsersService } from './users.service';
import { AccountService } from '../auth/account.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  private logged: Account;
  private user: UserDTO;

  private campaigns: CampaignDTO[];
  private collectPoints: CollectPointDTO[];

  private _destroy$: Subject<void>;
  
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private accountService: AccountService
  ) {
    this._destroy$ = new Subject();
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

  ngOnInit() {
    this.accountService.account
      .pipe(
        takeUntil(this._destroy$),
        switchMap((account: Account) => {
          this.logged = account;
          return this.route.paramMap;
        })
      )
      .subscribe(params => {
        const id = params.get('id') || this.logged._id;
        this.fetchUser(id);
      })
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  async fetchUser(id: string) {
    try {
      this.user = await this.userService.get(id);
      this.campaigns = await this.userService.listCampaigns(id);
      this.collectPoints = await this.userService.listCollectPoints(id);
    } catch (e) {
      console.error(e);
    }
  }
}
