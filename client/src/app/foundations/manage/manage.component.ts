import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FoundationsService } from '../foundations.service';
import { AccountService } from 'src/app/auth/account.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Account } from 'src/app/auth/auth.dto';
import { FoundationUpdateDTO } from '@models/foundation';
import { MatAutocompleteSelectedEvent, MatDialog, MatTable } from '@angular/material';
import { Product } from '@models/product';
import { ManageProductComponent } from '@dialogs/index';
import { Item } from '@models/fields/item';
import { FormControl } from '@angular/forms';
import { ProductService } from '@core/product.service';
import { GoalCreateDTO } from '@models/goal';
import { Collaborator } from '@models/fields/collaborator';
import { ActionCategory, ActionCategoryValues } from '@models/campaign';

enum FoundationTab {
  REGISTER_DATA,
  USERS,
  GOAL
}

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable, { static: true })
  private tableElmt: MatTable<Item>;

  private isLoading: boolean;

  private logged: Account;
  private selectedTab: FoundationTab;

  private item: Item;
  private productControl: FormControl;
  
  private goal: GoalCreateDTO;
  private users: Collaborator[];
  private foundation: FoundationUpdateDTO;

  private _destroy$: Subject<void>;
  private products: Observable<Product[]>
  private categoryOptions: ActionCategory[];

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _route: ActivatedRoute,
    private readonly _productService: ProductService,
    private readonly _accountService: AccountService,
    private readonly _foundationService: FoundationsService
  ) {
    this._destroy$ = new Subject();

    this.item = new Item();
    this.goal = new GoalCreateDTO();
    this.productControl = new FormControl();
    this.foundation = new FoundationUpdateDTO();
    this.categoryOptions = ActionCategoryValues;
    this.selectedTab = FoundationTab.REGISTER_DATA;
  }

  ngOnInit() {
    this._accountService.account
      .pipe(takeUntil(this._destroy$))
      .subscribe(account => {
        this.logged = account;
        this.fetchFoundation();
      });
      this.products = this.productControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        map(value => typeof value === 'string' ? value : value.name),
        switchMap(value => this._productService.list(value)),
        map(response => {
          if (response.length) {
            return response.filter(product => {
              const alreadyContains = this.goal.items
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

  private async fetchFoundation() {
    try {
      this.isLoading = true;
      this.foundation = await this._foundationService.get(this.logged._id);
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }


  productLabel(payload?: Product): string | undefined {
    return payload && payload._id && payload.name;
  }

  onRemoveItem(value: Product) {
    const index = this.goal.items.findIndex(item => value._id === item.product);
    this.goal.items.splice(index, 1);
    this.tableElmt.renderRows();
  }

  onInsertItem() {
    const { _id, name, type } = this.productControl.value;
    this.item.product = _id;
    this.item.name = name;
    this.item.type = type;
    this.goal.items.push({ ...this.item });
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
          await this._productService.save(result);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}
