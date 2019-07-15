import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatDialog, MatTable } from '@angular/material';

import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { Product } from '@models/product';
import { Account } from 'src/app/auth/auth.dto';
import { ItemUnit, ItemUnitValues, Item } from '@models/fields/item';
import { CampaignCreateDTO, ActionCategory, ActionCategoryValues } from '@models/campaign';

import { ProductService } from '@core/product.service';
import { AccountService } from 'src/app/auth/account.service';

import { ManageProductComponent } from '@dialogs/index';
import { AddressService } from '@core/address.service';
import { CampaignsService } from '../campaigns.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable, { static: true })
  private tableElmt: MatTable<Item>;

  private isLoading: boolean;
  private isLoadingAddress: boolean;

  private cep: Subject<void>;
  private _destroy$: Subject<void>;
  private productControl: FormControl;

  private logged: Account;

  private item: Item;

  private columns: string[];
  private itemUnits: ItemUnit[];
  private types: ActionCategory[];

  private campaign: CampaignCreateDTO;
  private products: Observable<Product[]>

  constructor(
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private productService: ProductService,
    private accountService: AccountService,
    private addressService: AddressService,
    private _campaignService: CampaignsService,
  ) {
    this.item = new Item();
    this.cep = new Subject();
    this._destroy$ = new Subject();
    this.campaign = new CampaignCreateDTO();
    this.productControl = new FormControl();

    this.itemUnits = ItemUnitValues;
    this.types = ActionCategoryValues;
    this.columns = ['product', 'quantity', 'unit', 'actions'];
  }

  get finishAt() {
    const { initAt, ttl } = this.campaign;
    if (initAt && ttl) {
      const date = new Date(initAt.getTime());
      return date.setDate(date.getDate() + ttl);
    }
    return null;
  }

  get isInstitutional() {
    return this.logged && this.logged.institutional;
  }

  get action() {
    return this.campaign._id ? 'Editar' : 'Cadastrar';
  }

  get validProduct() {
    if (!this.productControl.value) { return false; }
    const { _id } = this.productControl.value;
    return _id && this.item.quantity && this.item.unit;
  }

  ngOnInit() {
    this._route.queryParamMap
      .pipe(takeUntil(this._destroy$))
      .subscribe(async (params) => {
        const id = params.get('id');
        if (id) {
          //this.campaign = await this._campaignService.get(id);
        }
      });
    this.accountService.account
      .pipe(takeUntil(this._destroy$))
      .subscribe(account => this.logged = account);
    this.cep.pipe(
      takeUntil(this._destroy$),
      debounceTime(300),
    )
      .subscribe(async () => {
        const { cep } = this.campaign.collectPoint.address;
        if (cep.length === 8) {
          try {
            this.isLoadingAddress = true;
            this.campaign.collectPoint.address = await this.addressService.getByCEP(cep);
          } catch (e) {
            console.error(e);
          } finally {
            this.isLoadingAddress = false;
          }
        }
      });
    this.products = this.productControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        map(value => typeof value === 'string' ? value : value.name),
        switchMap(value => this.productService.list(value)),
        map(response => {
          if (response.length) {
            return response.filter(product => {
              const alreadyContains = this.campaign.items
                .find(selected => selected.product === product._id);
              return !alreadyContains;
            });
          }
          return [{
            _id: null,
            name: 'Produto não encontrato. Desejo cadastrá-lo'
          }] as Product[]
        })
      );
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  productLabel(payload?: Product): string | undefined {
    return payload && payload._id && payload.name;
  }

  onRemoveItem(value: Product) {
    const index = this.campaign.items.findIndex(item => value._id === item.product);
    this.campaign.items.splice(index, 1);
    this.tableElmt.renderRows();
  }

  onInsertItem() {
    const { _id, name, type } = this.productControl.value;
    this.item.product = _id;
    this.item.name = name;
    this.item.type = type;
    this.campaign.items.push({ ...this.item });
    this.item = new Item();
    this.productControl.setValue('');
    this.tableElmt.renderRows();
  }

  async onSelectProduct(evt: MatAutocompleteSelectedEvent) {
    const selectedOption = evt.option.value as Product;
    if (!selectedOption._id) {
      const dialogRef = this._dialog.open(ManageProductComponent);
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        try {
          await this.productService.save(result);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  async onSave() {
    try {
      this.isLoading = true;
      await this._campaignService.save(this.campaign);
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }
}
