import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';

import { Item } from '@models/fields/item';
import { MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivityCollection } from '@models/fields/activity';
import { FormControl } from '@angular/forms';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ProductService } from '@core/product.service';
import { CampaignsService } from 'src/app/campaigns/campaigns.service';
import { FoundationsService } from 'src/app/foundations/foundations.service';
import { DonationCreateDTO } from '@models/donation';
import { CollectPointGetDTO } from '@models/collect-point';

export class RegisterDonationData {
  constructor (
    public activityID?: string,
    public collectPointID?: string,
    public activityType?: ActivityCollection,
  ) {}
}

@Component({
  selector: 'app-register-donation',
  templateUrl: './register-donation.component.html',
  styleUrls: ['./register-donation.component.scss']
})
export class RegisterDonationComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void>;

  private donation: DonationCreateDTO;

  private item: Item;
  private itemControl: FormControl;
  private items: Observable<Item[]>;
  
  private collectPointControl: FormControl;
  private collectPoints: Observable<CollectPointGetDTO[]>;

  constructor(
    private _goalService: FoundationsService,
    private _campaignService: CampaignsService,
    @Inject(MAT_DIALOG_DATA) private data: RegisterDonationData,
  ) {
    this._destroy$ = new Subject();

    this.item = new Item();
    this.donation = new DonationCreateDTO(
      data.activityID,
      data.activityType,
      data.collectPointID
    );

    this.itemControl = new FormControl();
    this.collectPointControl = new FormControl();
  }

  get validItem() {
    const { product, quantity, unit } = this.item;
    return product && quantity && unit;
  }

  get validDonation() {
    const { target, targetSource, collectPoint, items } = this.donation;
    return target && targetSource && collectPoint && items.length;
  }

  ngOnInit() {
    this.items = this.itemControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        map(value => typeof value === 'string' ? value : value.name),
        switchMap(value => {
          switch (this.data.activityType) {
            case ActivityCollection.GOAL:
              return this._goalService.getGoalItems(this.data.activityID, value);
            case ActivityCollection.CAMPAIGN:
              return this._campaignService.getItems(this.data.activityID, value);
            default:
              return of([]);
          }
        }),
        map(response => {
          if (response.length) {
            return response.filter(product => {
              const alreadyContains = this.donation.items
                .find(selected => selected.product === product.product);
              return !alreadyContains;
            });
          }
          return [{
            product: null,
            name: 'Produto não encontrato.'
          }] as Item[];
        })
      )
    this.collectPoints = this.collectPointControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        map(value => typeof value === 'string' && value),
        switchMap(value => {
          switch (this.data.activityType) {
            case ActivityCollection.GOAL:
              return this._goalService.getGoalCollectPoints(this.data.activityID, value);
            case ActivityCollection.CAMPAIGN:
              return this._campaignService.getCollectPoints(this.data.activityID, value);
            default:
              return of([]);
          }
        })
      )
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  /** Item functions */
  onResetItem() {
    this.itemControl.setValue('');
    this.item = new Item();
  }

  itemLabel(payload?: Item): string | undefined {
    return payload && payload.name;
  }

  onRemoveItem(value: Item) {
    const index = this.donation.items.findIndex(item => item.product === value.product);
    this.donation.items.splice(index, 1);
  }

  onInsertItem() {
    this.donation.items.push({ ...this.item });
    this.onResetItem();
  }

  async onSelectItem(evt: MatAutocompleteSelectedEvent) {
    const selectedOption = evt.option.value as Item;
    if (selectedOption.product) {
      this.item.product = selectedOption.product;
      this.item.name = selectedOption.name;
      this.item.type = selectedOption.type;
      this.item.unit = selectedOption.unit;
    }
  }

  /** CollectPoints functions */
  collectPointLabel(value: CollectPointGetDTO) {
    return value && (
      `${value.address.street}, ${value.address.number} - ${value.address.district} - ${value.address.city}/${value.address.state}`
    );
  }

  async onSelectCollectPoint(evt: MatAutocompleteSelectedEvent) {
    const selectedOption = evt.option.value as CollectPointGetDTO;
    this.donation.collectPoint = selectedOption._id;
  }
}
