import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';

import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { Product } from '@models/product';
import { Account } from 'src/app/auth/auth.dto';
import { ItemUnit, ItemUnitValues } from '@models/fields/item';
import { CampaignCreateDTO, ActionCategory, ActionCategoryValues } from '@models/campaign';

import { ProductService } from '@core/product.service';
import { AccountService } from 'src/app/auth/account.service';

import { ManageProductComponent } from '@dialogs/index';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void>;
  private productControl: FormControl;

  private logged: Account;

  private itemUnits: ItemUnit[];
  private types: ActionCategory[];

  private campaign: CampaignCreateDTO;
  private products: Observable<Product[]>

  constructor(
    private _dialog: MatDialog,
    private productService: ProductService,
    private accountService: AccountService
  ) {
    this._destroy$ = new Subject();
    this.campaign = new CampaignCreateDTO();
    this.productControl = new FormControl();
    
    this.itemUnits = ItemUnitValues;
    this.types = ActionCategoryValues;
  }

  get isInstitutional() {
    return this.logged && this.logged.institutional;
  }

  get action() {
    return this.campaign._id ? 'Editar' : 'Cadastrar';
  }

  ngOnInit() {
    this.accountService.account
      .pipe(takeUntil(this._destroy$))
      .subscribe(account => this.logged = account);
    this.products = this.productControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        map(value => typeof value === 'string' ?  value : value.name),
        switchMap(value => this.productService.list(value)),
        map(response => {
          if (response.length) {
            return response;
          }
          return [{
            _id: null,
            name: 'Produto não encontrato. Desejo cadastrá-lo'
          }] as Product[]
        })
      )
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  productLabel(payload?: Product): string | undefined {
    return payload && payload._id ? payload.name : undefined;
  }

  async onProduct(evt: MatAutocompleteSelectedEvent) {
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
}
